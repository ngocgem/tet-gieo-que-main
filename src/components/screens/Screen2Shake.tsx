import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FortuneSticks, CloudDecor, GoldCoin, CornerLanterns, GoldParticles, BookFairy } from "@/components/DecorativeElements";
import { booksData } from "@/pages/Index";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

// Shared AudioContext created on first user interaction to satisfy mobile autoplay policy
let sharedCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  try {
    if (!sharedCtx || sharedCtx.state === 'closed') {
      sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (sharedCtx.state === 'suspended') {
      sharedCtx.resume();
    }
    return sharedCtx;
  } catch (e) {
    return null;
  }
};

// Simple bamboo clatter sound using Web Audio API
const playClatterSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const strikes = 12;
    for (let i = 0; i < strikes; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      filter.type = 'bandpass';
      filter.frequency.value = 800 + Math.random() * 2000;
      filter.Q.value = 2 + Math.random() * 5;
      
      osc.type = 'square';
      osc.frequency.value = 200 + Math.random() * 600;
      
      const startTime = ctx.currentTime + i * 0.06 + Math.random() * 0.03;
      gain.gain.setValueAtTime(0.08 + Math.random() * 0.06, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04 + Math.random() * 0.03);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.08);
    }
  } catch (e) {
    // Audio not supported, silent fallback
  }
};

// Suspense cue when 3 sticks burst out
const playRevealSuspenseSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Rising drone layer
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

    // Pulsing heart-beat knocks
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

    // Small shimmer hit at the end
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(520, ctx.currentTime + 1.1);
    shimmer.frequency.exponentialRampToValueAtTime(980, ctx.currentTime + 1.42);
    shimmerGain.gain.setValueAtTime(0.0001, ctx.currentTime + 1.08);
    shimmerGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.2);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.46);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmer.start(ctx.currentTime + 1.08);
    shimmer.stop(ctx.currentTime + 1.48);
  } catch (e) {
    // Audio not supported, silent fallback
  }
};

// Three short wooden impact hits when sticks land near jar bottom
const playLandingImpactSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    for (let i = 0; i < 3; i++) {
      const hit = ctx.createOscillator();
      const hitGain = ctx.createGain();
      const hitFilter = ctx.createBiquadFilter();
      hit.type = "triangle";
      hit.frequency.value = 130 - i * 12;
      hitFilter.type = "bandpass";
      hitFilter.frequency.value = 320 + i * 60;
      hitFilter.Q.value = 2.2;
      const t = ctx.currentTime + i * 0.075;
      hitGain.gain.setValueAtTime(0.0001, t);
      hitGain.gain.exponentialRampToValueAtTime(0.09, t + 0.015);
      hitGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      hit.connect(hitFilter);
      hitFilter.connect(hitGain);
      hitGain.connect(ctx.destination);
      hit.start(t);
      hit.stop(t + 0.2);
    }
  } catch (e) {
    // Audio not supported, silent fallback
  }
};

const Screen2Shake = ({ onNext, onBack }: Props) => {
  const [shaking, setShaking] = useState(false);
  const [holdShake, setHoldShake] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [revealFlash, setRevealFlash] = useState(false);
  const shakeTriggered = useRef(false);
  const timersRef = useRef<number[]>([]);
  const clatterLoopRef = useRef<number | null>(null);

  const stopClatterLoop = () => {
    if (clatterLoopRef.current !== null) {
      window.clearInterval(clatterLoopRef.current);
      clatterLoopRef.current = null;
    }
  };

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    stopClatterLoop();
  };

  const handleShake = useCallback(() => {
    if (shaking || shakeTriggered.current) return;
    shakeTriggered.current = true;
    setHoldShake(false);
    setShaking(true);

    // Unlock AudioContext on mobile (must be called directly inside user gesture)
    getAudioContext();

    // Start clatter loop while the ritual is shaking (tempo ramps up over 5s).
    const startClatterLoop = (intervalMs: number) => {
      stopClatterLoop();
      clatterLoopRef.current = window.setInterval(() => {
        playClatterSound();
      }, intervalMs);
    };

    playClatterSound();
    stopClatterLoop();
    startClatterLoop(760);

    const tempoMidTimer = window.setTimeout(() => startClatterLoop(560), 1800);
    const tempoHighTimer = window.setTimeout(() => startClatterLoop(380), 3500);
    const preRevealPulseTimer = window.setTimeout(() => playClatterSound(), 4600);
    
    // Vibrate device if supported
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50, 30, 80, 40, 60, 30, 50]);
    }
    
    // Ritual shake lasts 5 seconds.
    const revealTimer = window.setTimeout(() => {
      setShaking(false);
      stopClatterLoop();
      playRevealSuspenseSound();
      setRevealFlash(true);
      setShowReveal(true);
    }, 5000);

    const flashOffTimer = window.setTimeout(() => {
      setRevealFlash(false);
    }, 5220);

    const landingHitTimer = window.setTimeout(() => {
      playLandingImpactSound();
    }, 6500);

    // Show book title + author after the sticks complete their up/down burst.
    const cardTimer = window.setTimeout(() => {
      setShowCards(true);
    }, 7200);

    // Smoothly fade current screen before entering the real result screen.
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, 9900);

    // Keep title/author screen around 3 seconds, then navigate.
    const nextTimer = window.setTimeout(() => onNext(), 10200);
    timersRef.current.push(
      tempoMidTimer,
      tempoHighTimer,
      preRevealPulseTimer,
      revealTimer,
      flashOffTimer,
      landingHitTimer,
      cardTimer,
      exitTimer,
      nextTimer,
    );
  }, [shaking, onNext]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Real device shake detection
  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastTime = Date.now();
    const SHAKE_THRESHOLD = 25;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;
      
      const now = Date.now();
      const timeDiff = now - lastTime;
      
      if (timeDiff > 80) {
        const deltaX = Math.abs(acc.x - lastX);
        const deltaY = Math.abs(acc.y - lastY);
        const deltaZ = Math.abs(acc.z - lastZ);
        
        const speed = (deltaX + deltaY + deltaZ) / (timeDiff / 1000);
        
        if (speed > SHAKE_THRESHOLD) {
          handleShake();
        }
        
        lastX = acc.x;
        lastY = acc.y;
        lastZ = acc.z;
        lastTime = now;
      }
    };

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceMotionEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        } catch (e) {
          // Permission denied
        }
      } else {
        window.addEventListener('devicemotion', handleMotion);
      }
    };

    requestPermission();
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [handleShake]);

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
        active={shaking || holdShake}
        className="left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2"
      />
      <CloudDecor className="top-0 left-0" />
      <CloudDecor className="top-16 right-0" />
      <CloudDecor className="bottom-20 left-4" />

      {!showCards && (
        <div className="mt-10 px-6 text-center">
          <p className="text-tet-cream-text text-lg leading-relaxed font-semibold text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Hãy gửi gắm mong muốn, <span className="text-amber-300 font-extrabold">cầm chắc điện thoại</span> và lắc nhẹ để gieo quẻ.
          </p>
          <p className="text-primary text-base mt-2 font-semibold text-shadow-gold">
            Lắc hũ trong 5 giây để khai quẻ
          </p>
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
              animate={shaking || holdShake ? {
                rotate: [0, -18, 15, -12, 9, -5, 2, 0],
                y: [0, -8, 5, -3, 3, 0],
              } : {}}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              onClick={handleShake}
              onPointerDown={() => setHoldShake(true)}
              onPointerUp={() => setHoldShake(false)}
              onPointerLeave={() => setHoldShake(false)}
              className="cursor-pointer"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
            >
              <FortuneSticks shaking={shaking || holdShake} revealSticks={showReveal} />
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

        {/* 3 sticks morphing into book cards */}
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

      {!showCards && (
        <motion.button
          onClick={handleShake}
          whileTap={{ scale: 0.92 }}
          className="relative mt-auto mb-3 overflow-hidden rounded-2xl bg-red-600/70 px-10 py-3.5 font-display text-lg font-semibold text-yellow-100 shadow-lg hover:bg-red-600/80"
        >
          <span className="relative z-10">
            {shaking ? "Đang gieo quẻ..." : "Hoặc chạm hũ để lắc quẻ"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ backgroundSize: '200% 100%' }} />
        </motion.button>
      )}

    </motion.div>
  );
};

export default Screen2Shake;
