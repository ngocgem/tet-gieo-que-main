import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FortuneSticks, CloudDecor, GoldCoin, CornerLanterns, GoldParticles, BookFairy } from "@/components/DecorativeElements";
import { booksData } from "@/pages/Index";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const REQUIRED_SHAKE_MS = 7000;
const SHAKE_THRESHOLD = 24;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

let sharedCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  try {
    if (!sharedCtx || sharedCtx.state === "closed") {
      sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (sharedCtx.state === "suspended") {
      sharedCtx.resume();
    }
    return sharedCtx;
  } catch {
    return null;
  }
};

const playClatterSound = (intensity = 0.5) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const safeIntensity = clamp(intensity, 0, 1);
    const strikes = 6 + Math.round(safeIntensity * 5);
    for (let i = 0; i < strikes; i++) {
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.value = 700 + Math.random() * (2200 + safeIntensity * 900);
      filter.Q.value = 2 + Math.random() * (5 + safeIntensity * 2);

      osc.type = "square";
      osc.frequency.value = 180 + Math.random() * (560 + safeIntensity * 140);
      overtone.type = "triangle";
      overtone.frequency.value = osc.frequency.value * (1.7 + Math.random() * 0.5);

      const startTime = ctx.currentTime + i * (0.052 - safeIntensity * 0.008) + Math.random() * 0.022;
      const peak = 0.04 + safeIntensity * 0.05 + Math.random() * 0.02;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(peak, startTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05 + Math.random() * 0.035);

      osc.connect(filter);
      overtone.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      overtone.start(startTime);
      osc.stop(startTime + 0.09);
      overtone.stop(startTime + 0.07);
    }
  } catch {
    // Silent fallback when audio is unavailable.
  }
};

const playRevealSuspenseSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    drone.type = "sawtooth";
    drone.frequency.setValueAtTime(110, ctx.currentTime);
    drone.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 1.4);
    droneFilter.type = "lowpass";
    droneFilter.frequency.setValueAtTime(600, ctx.currentTime);
    droneFilter.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 1.4);
    droneGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    droneGain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.35);
    droneGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.45);
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(ctx.destination);
    drone.start(ctx.currentTime);
    drone.stop(ctx.currentTime + 1.5);

    for (let i = 0; i < 4; i++) {
      const pulse = ctx.createOscillator();
      const pulseGain = ctx.createGain();
      pulse.type = "triangle";
      pulse.frequency.value = 70 + i * 8;
      const t = ctx.currentTime + 0.18 + i * 0.22;
      pulseGain.gain.setValueAtTime(0.0001, t);
      pulseGain.gain.exponentialRampToValueAtTime(0.075, t + 0.02);
      pulseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      pulse.connect(pulseGain);
      pulseGain.connect(ctx.destination);
      pulse.start(t);
      pulse.stop(t + 0.18);
    }
  } catch {
    // Silent fallback when audio is unavailable.
  }
};

const playLandingImpactSound = (intensity = 0.85) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const safeIntensity = clamp(intensity, 0, 1);

    // Sparkle pre-hit for a playful suspense cue.
    for (let i = 0; i < 3; i++) {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      const t = ctx.currentTime + i * 0.055;
      sparkle.type = "sine";
      sparkle.frequency.setValueAtTime(720 + i * 120, t);
      sparkle.frequency.exponentialRampToValueAtTime(940 + i * 150, t + 0.07);
      sparkleGain.gain.setValueAtTime(0.0001, t);
      sparkleGain.gain.exponentialRampToValueAtTime(0.022 + safeIntensity * 0.02, t + 0.02);
      sparkleGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.085);
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      sparkle.start(t);
      sparkle.stop(t + 0.09);
    }

    for (let i = 0; i < 3; i++) {
      const hit = ctx.createOscillator();
      const boom = ctx.createOscillator();
      const hitGain = ctx.createGain();
      const boomGain = ctx.createGain();
      const hitFilter = ctx.createBiquadFilter();
      hit.type = "triangle";
      hit.frequency.value = 150 - i * 10;
      boom.type = "sine";
      boom.frequency.setValueAtTime(72 - i * 5, ctx.currentTime);
      boom.frequency.exponentialRampToValueAtTime(48 - i * 2, ctx.currentTime + 0.18);
      hitFilter.type = "bandpass";
      hitFilter.frequency.value = 280 + i * 80;
      hitFilter.Q.value = 2.4;
      const t = ctx.currentTime + 0.16 + i * 0.088;
      hitGain.gain.setValueAtTime(0.0001, t);
      hitGain.gain.exponentialRampToValueAtTime(0.065 + safeIntensity * 0.045, t + 0.012);
      hitGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      boomGain.gain.setValueAtTime(0.0001, t);
      boomGain.gain.exponentialRampToValueAtTime(0.028 + safeIntensity * 0.03, t + 0.018);
      boomGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      hit.connect(hitFilter);
      hitFilter.connect(hitGain);
      hitGain.connect(ctx.destination);
      boom.connect(boomGain);
      boomGain.connect(ctx.destination);
      hit.start(t);
      boom.start(t);
      hit.stop(t + 0.17);
      boom.stop(t + 0.21);
    }
  } catch {
    // Silent fallback when audio is unavailable.
  }
};

const Screen2Shake = ({ onNext, onBack }: Props) => {
  const [shaking, setShaking] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [revealFlash, setRevealFlash] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const [sensorButtonHidden, setSensorButtonHidden] = useState(false);
  const [isShakeArmed, setIsShakeArmed] = useState(false);
  const [shakeProgress, setShakeProgress] = useState(0);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [shakeTilt, setShakeTilt] = useState(0);
  const [shakeLift, setShakeLift] = useState(0);

  const shakeTriggered = useRef(false);
  const timersRef = useRef<number[]>([]);
  const shakeProgressRef = useRef(0);
  const lastClatterAtRef = useRef(0);
  const shakeIntensityRef = useRef(0);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const triggerRevealSequence = useCallback(() => {
    setIsShakeArmed(false);
    setShaking(false);
    setShakeIntensity(0);
    setShakeTilt(0);
    setShakeLift(0);
    playRevealSuspenseSound();
    setRevealFlash(true);
    setShowReveal(true);

    const flashOffTimer = window.setTimeout(() => {
      setRevealFlash(false);
    }, 220);

    const landingHitTimer = window.setTimeout(() => {
      playLandingImpactSound(0.95);
    }, 1500);

    const cardTimer = window.setTimeout(() => {
      setShowCards(true);
    }, 2200);

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, 4900);

    const nextTimer = window.setTimeout(() => onNext(), 5200);
    timersRef.current.push(flashOffTimer, landingHitTimer, cardTimer, exitTimer, nextTimer);
  }, [onNext]);

  const advanceProgress = useCallback((elapsedMs: number) => {
    setShakeProgress((prev) => {
      const next = Math.min(REQUIRED_SHAKE_MS, prev + elapsedMs);
      shakeProgressRef.current = next;

      if (next >= REQUIRED_SHAKE_MS && !shakeTriggered.current) {
        shakeTriggered.current = true;
        triggerRevealSequence();
      }

      return next;
    });
  }, [triggerRevealSequence]);

  const armShakeMode = useCallback(async () => {
    if (showCards || showReveal || shakeTriggered.current) return;

    setSensorButtonHidden(true);
    getAudioContext();

    if (typeof window === "undefined" || !("DeviceMotionEvent" in window)) {
      setMotionReady(false);
      setIsShakeArmed(false);
      setSensorButtonHidden(false);
      return;
    }

    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission !== "granted") {
          setMotionReady(false);
          setIsShakeArmed(false);
          setSensorButtonHidden(false);
          return;
        }
      } catch {
        setMotionReady(false);
        setIsShakeArmed(false);
        setSensorButtonHidden(false);
        return;
      }
    }

    setMotionReady(true);
    setIsShakeArmed(true);
    setShakeProgress(0);
    shakeProgressRef.current = 0;
    lastClatterAtRef.current = 0;
    shakeIntensityRef.current = 0;
    setShakeIntensity(0);
    setShakeTilt(0);
    setShakeLift(0);
  }, [showCards, showReveal]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (!motionReady) return;

    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastTime = Date.now();

    const handleMotion = (e: DeviceMotionEvent) => {
      if (!isShakeArmed || shakeTriggered.current) return;

      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const now = Date.now();
      const timeDiff = now - lastTime;
      if (timeDiff <= 80) return;

      const deltaX = Math.abs(acc.x - lastX);
      const deltaY = Math.abs(acc.y - lastY);
      const deltaZ = Math.abs(acc.z - lastZ);
      const speed = (deltaX + deltaY + deltaZ) / (timeDiff / 1000);

      if (speed > SHAKE_THRESHOLD) {
        setShaking(true);

        const rawIntensity = clamp((speed - SHAKE_THRESHOLD) / 165, 0, 1);
        const smoothIntensity = shakeIntensityRef.current * 0.72 + rawIntensity * 0.28;
        shakeIntensityRef.current = smoothIntensity;
        setShakeIntensity(smoothIntensity);
        setShakeTilt(clamp(acc.x * 2, -12, 12) * (0.3 + smoothIntensity * 0.5));
        setShakeLift(clamp(-acc.y * 1.2, -9, 5) * (0.2 + smoothIntensity * 0.45));

        const ratio = shakeProgressRef.current / REQUIRED_SHAKE_MS;
        const clatterInterval = Math.max(260, 790 - ratio * 340 - smoothIntensity * 170);
        if (now - lastClatterAtRef.current >= clatterInterval) {
          playClatterSound(smoothIntensity);
          lastClatterAtRef.current = now;
        }

        advanceProgress(timeDiff * (0.8 + smoothIntensity * 0.34));
      } else {
        setShaking(false);
        shakeIntensityRef.current *= 0.84;
        setShakeIntensity(shakeIntensityRef.current);
        setShakeTilt((prev) => prev * 0.72);
        setShakeLift((prev) => prev * 0.72);
        setShakeProgress((prev) => {
          const next = Math.max(0, prev - timeDiff * 1.15);
          shakeProgressRef.current = next;
          return next;
        });
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
      lastTime = now;
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [advanceProgress, motionReady, isShakeArmed]);

  const shakePercent = Math.round((shakeProgress / REQUIRED_SHAKE_MS) * 100);

  return (
    <motion.div
      className="relative flex min-h-[82vh] flex-col items-center gap-5 pt-6"
      initial={false}
      animate={isExiting ? { opacity: 0, y: -8, filter: "blur(2px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {!showCards && (
        <button
          onClick={onBack}
          className="absolute top-2 left-1/2 z-50 -translate-x-1/2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 border-red-400 bg-red-900/95 text-yellow-100 text-base font-bold tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.65)] hover:bg-red-900/100 hover:scale-105 transition transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/80 min-w-[150px]"
        >
          <span className="text-lg">←</span>
          <span className="whitespace-nowrap">Quay lại</span>
        </button>
      )}

      <CornerLanterns />
      <BookFairy
        mode="jarOrbit"
        active={shaking || shakeIntensity > 0.08}
        className="left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2"
      />
      <CloudDecor className="top-0 left-0" />
      <CloudDecor className="top-16 right-0" />
      <CloudDecor className="bottom-20 left-4" />

      {!showCards && (
        <div className="mt-10 px-6 text-center">
          <p className="text-tet-cream-text text-lg leading-relaxed font-semibold text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Cầm chắc điện thoại và lắc...
          </p>

          <div className="mx-auto mt-3 w-full max-w-sm">
            <div className="h-2.5 rounded-full bg-black/25 border border-primary/30 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(51, 100%, 50%), hsl(43, 96%, 42%), hsl(51, 100%, 55%))" }}
                animate={{ width: `${shakePercent}%` }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
            </div>
            <p className="mt-2 text-primary text-base font-semibold text-shadow-gold">{shakePercent}%</p>
          </div>

        </div>
      )}

      <div className={`relative flex w-full justify-center ${showCards ? "min-h-[70vh] items-center" : "mt-14 pt-3"}`}>
        {!showCards && (
          <>
            <GoldCoin className="absolute -top-6 -left-10" />
            <GoldCoin className="absolute -top-2 -right-8" />
            <GoldCoin className="absolute bottom-16 -right-12" />
            <GoldCoin className="absolute bottom-20 -left-10" />
          </>
        )}

        <AnimatePresence>
          {!showCards && (
            <motion.div
              animate={{
                rotate: shakeTilt,
                y: shakeLift,
                scale: 1 + shakeIntensity * 0.025,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.45 }}
              className="cursor-default"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
            >
              <FortuneSticks shaking={shaking} shakeIntensity={shakeIntensity} revealSticks={showReveal} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {revealFlash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{ opacity: [0, 0.92, 0.35, 0], scale: [0.35, 1.1, 1.25, 1.45] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-[36%] z-30 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,239,170,0.95) 0%, rgba(255,198,86,0.72) 40%, rgba(255,153,51,0.22) 70%, rgba(255,153,51,0) 100%)",
                mixBlendMode: "screen",
              }}
            />
          )}
        </AnimatePresence>

        {shaking && <GoldParticles />}

        <AnimatePresence>
          {showCards && (
            <motion.div
              initial={{ opacity: 0, y: -220, scale: 0.72 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.52, ease: "easeOut" }}
              className="absolute inset-0 z-40 flex items-center justify-center"
              style={{ perspective: 900 }}
            >
              <div className="flex w-full max-w-[410px] items-center justify-center gap-3 px-2">
                {booksData.slice(0, 3).map((book, i) => (
                  <motion.div
                    key={book.title}
                    initial={{ opacity: 0, y: -240, rotate: (i - 1) * 20, scale: 0.52 }}
                    animate={{ opacity: 1, y: [-110, 18, 0, -6, 0], rotate: [(i - 1) * 20, (i - 1) * 4, (i - 1) * 2.5], scale: [0.52, 1.2, 1, 1.02, 1] }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.9,
                      ease: "easeOut",
                      y: { repeat: Infinity, duration: 2.6 + i * 0.3, ease: "easeInOut" },
                    }}
                    className="relative w-[120px] h-[292px]"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="result-stick-shell">
                        <span className="result-stick-core" />
                        <span className="result-stick-grain" />
                        <span className="result-stick-cap" />
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(3px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      transition={{ delay: 0.18 + i * 0.22, duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-x-2 top-[72px] z-10 px-1 text-center"
                    >
                      <p
                        className="font-display text-[0.84rem] leading-[1.05] font-extrabold break-words text-white"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7), 0 3px 8px rgba(0,0,0,0.45)" }}
                      >
                        {book.title}
                      </p>
                      <p
                        className="mt-1 text-[0.58rem] leading-tight font-bold tracking-[0.12em] uppercase break-words text-white/95"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7), 0 3px 8px rgba(0,0,0,0.45)" }}
                      >
                        {book.author}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!showCards && !motionReady && !sensorButtonHidden && (
        <motion.button
          onClick={armShakeMode}
          whileTap={{ scale: 0.96 }}
          animate={{ y: [0, -4, 0], boxShadow: ["0 8px 18px rgba(0,0,0,0.35)", "0 12px 26px rgba(250,204,21,0.45)", "0 8px 18px rgba(0,0,0,0.35)"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-3 rounded-xl bg-red-600/85 px-6 py-2.5 text-sm font-semibold text-yellow-100 shadow-lg hover:bg-red-600/95"
        >
          Bật cảm biến trước khi lắc
        </motion.button>
      )}
    </motion.div>
  );
};

export default Screen2Shake;
