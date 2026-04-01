import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FortuneSticks, CloudDecor, GoldCoin, CornerLanterns, GoldParticles } from "@/components/DecorativeElements";
import { booksData } from "@/pages/Index";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

// Simple bamboo clatter sound using Web Audio API
const playClatterSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
    // Clean up after sounds finish
    setTimeout(() => ctx.close(), 2000);
  } catch (e) {
    // Audio not supported, silent fallback
  }
};

const Screen2Shake = ({ onNext, onBack }: Props) => {
  const [shaking, setShaking] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const shakeTriggered = useRef(false);

  const handleShake = useCallback(() => {
    if (shaking || shakeTriggered.current) return;
    shakeTriggered.current = true;
    setShaking(true);
    
    // Play clatter sound
    playClatterSound();
    
    // Vibrate device if supported
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 50, 30, 80, 40, 60, 30, 50]);
    }
    
    // After shake animation, reveal sticks popping out
    setTimeout(() => {
      setShowReveal(true);
    }, 1400);
    // Morph sticks into cards (skip loading screen entirely)
    setTimeout(() => {
      setShowCards(true);
    }, 2200);
    // Go directly to results screen
    setTimeout(() => onNext(), 4200);
  }, [shaking, onNext]);

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
    <div className="flex flex-col items-center gap-5 pt-6 relative">
      <button
        onClick={onBack}
        className="absolute top-0 left-0 z-20 flex items-center gap-1 text-tet-cream-text/70 hover:text-primary transition-colors text-sm font-medium"
      >
        <span>←</span> Quay lại
      </button>
      <CornerLanterns />
      <CloudDecor className="top-0 left-0" />
      <CloudDecor className="top-16 right-0" />
      <CloudDecor className="bottom-20 left-4" />

      <div className="text-center px-6">
        <p className="text-tet-cream-text text-base leading-relaxed font-light">
          Hãy gửi gắm mong muốn, cầm chắc điện thoại và lắc nhẹ để gieo quẻ.
        </p>
        <p className="text-primary text-sm mt-2 font-medium text-shadow-gold">
          Mỗi lần lắc — một nhân duyên ✨
        </p>
      </div>

      <div className="relative">
        <GoldCoin className="absolute -top-6 -left-10" />
        <GoldCoin className="absolute -top-2 -right-8" />
        <GoldCoin className="absolute bottom-16 -right-12" />
        <GoldCoin className="absolute bottom-20 -left-10" />

        <AnimatePresence>
          {!showCards && (
            <motion.div
              animate={shaking ? {
                rotate: [0, -18, 15, -12, 9, -5, 2, 0],
                y: [0, -8, 5, -3, 3, 0],
              } : {}}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              onClick={handleShake}
              className="cursor-pointer"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
            >
              <FortuneSticks shaking={shaking} revealSticks={showReveal} />
            </motion.div>
          )}
        </AnimatePresence>

        {shaking && <GoldParticles />}

        {/* 3 sticks morphing into book cards */}
        <AnimatePresence>
          {showCards && (
            <div className="flex flex-col gap-3 w-64">
              {booksData.map((book, i) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: -80, scaleY: 4, scaleX: 0.05, rotate: (i - 1) * 8 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1, scaleX: 1, rotate: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.7, type: "spring", stiffness: 70, damping: 12 }}
                  className="parchment-bg rounded-xl p-3 shadow-lg flex items-center gap-3"
                  style={{
                    border: '1px solid',
                    borderImage: 'linear-gradient(135deg, hsl(51, 100%, 55% / 0.5), hsl(43, 96%, 42% / 0.3)) 1',
                  }}
                >
                  <div className="w-10 h-14 rounded overflow-hidden flex-shrink-0 border border-primary/20">
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-accent truncate">{book.title}</p>
                    <p className="text-card-foreground/60 text-xs">{book.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {!showCards && (
        <motion.button
          onClick={handleShake}
          whileTap={{ scale: 0.92 }}
          className="px-10 py-3.5 rounded-2xl gold-gradient text-primary-foreground font-display font-bold text-lg shadow-xl animate-pulse-glow relative overflow-hidden"
        >
          <span className="relative z-10">
            {shaking ? "✨ Đang gieo quẻ..." : "👋 Chạm để lắc quẻ"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        </motion.button>
      )}

      {!showCards && !shaking && (
        <p className="text-tet-cream-text/50 text-xs italic">Hoặc lắc điện thoại của bạn 📱</p>
      )}
    </div>
  );
};

export default Screen2Shake;
