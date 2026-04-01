import { motion } from "framer-motion";

export const FallingPetals = () => {
  const petals = Array.from({ length: 18 }, (_, i) => i);
  const petalTypes = ['🌸', '🏵️', '✿'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            animationDelay: `${(i * 1.7) % 8}s`,
            animationDuration: `${7 + (i % 5) * 1.5}s`,
            fontSize: `${10 + (i % 4) * 4}px`,
            opacity: 0.4 + (i % 3) * 0.2,
          }}
        >
          {petalTypes[i % 3]}
        </div>
      ))}
    </div>
  );
};

export const FloatingClouds = () => {
  const clouds = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((i) => (
        <div
          key={i}
          className="absolute animate-drift text-5xl"
          style={{
            left: `${(i * 23 + 5) % 90}%`,
            top: `${(i * 19 + 10) % 80}%`,
            animationDelay: `${i * 3}s`,
            animationDuration: `${15 + i * 4}s`,
            opacity: 0.06,
            fontSize: `${40 + i * 10}px`,
          }}
        >
          ☁
        </div>
      ))}
    </div>
  );
};

export const GoldBorderTop = () => (
  <div className="w-full h-10 flex flex-col items-center justify-center relative z-10">
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
    <div className="flex items-center gap-2 my-1">
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
      {[...Array(3)].map((_, i) => (
        <span key={i} className="text-primary text-xs animate-glow-pulse" style={{ animationDelay: `${i * 0.4}s` }}>✦</span>
      ))}
      <span className="text-primary text-sm font-display">❖</span>
      {[...Array(3)].map((_, i) => (
        <span key={i + 3} className="text-primary text-xs animate-glow-pulse" style={{ animationDelay: `${(i + 3) * 0.4}s` }}>✦</span>
      ))}
      <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
    </div>
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
  </div>
);

export const GoldBorderBottom = () => (
  <div className="w-full h-10 flex flex-col items-center justify-center relative z-10">
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
    <div className="flex items-center gap-2 my-1">
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
      {[...Array(3)].map((_, i) => (
        <span key={i} className="text-primary text-xs">✦</span>
      ))}
      <span className="text-primary text-sm font-display">❖</span>
      {[...Array(3)].map((_, i) => (
        <span key={i + 3} className="text-primary text-xs">✦</span>
      ))}
      <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
    </div>
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
  </div>
);

export const CloudDecor = ({ className = "" }: { className?: string }) => (
  <div className={`absolute opacity-[0.07] text-tet-parchment text-5xl animate-drift ${className}`}>☁</div>
);

export const Lantern = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`text-3xl ${className}`}
    animate={{ rotate: [-5, 5, -5] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    🏮
  </motion.div>
);

export const GoldCoin = ({ className = "" }: { className?: string }) => (
  <motion.div 
    className={`text-2xl ${className}`}
    animate={{ y: [0, -8, 0], rotateY: [0, 180, 360] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    🪙
  </motion.div>
);

export const BookFairy = ({
  mode = "orbit",
  active = true,
  className = "",
}: {
  mode?: "flyby" | "orbit" | "jarOrbit";
  active?: boolean;
  className?: string;
}) => {
  if (!active) return null;

  if (mode === "flyby") {
    return (
      <motion.div
        className={`pointer-events-none absolute z-30 ${className}`}
        initial={{ x: "-2vw", y: 10, opacity: 1, scale: 0.92, rotate: -8 }}
        animate={{
          x: "108vw",
          y: [10, -8, 4, -6, 10],
          opacity: [1, 1, 1, 1, 0.88],
          scale: [0.92, 1.06, 1.1, 1.05, 0.98],
          rotate: [-8, -4, 1, -2, 0],
        }}
        transition={{ duration: 10.8, ease: "easeInOut", times: [0, 0.15, 0.45, 0.8, 1] }}
      >
        <div className="relative">
          <motion.span
            className="absolute left-[1px] top-7 h-5 w-10 rounded-full bg-cyan-300/45 blur-[2px]"
            animate={{ scaleX: [0.9, 1.05, 0.95, 1], opacity: [0.7, 1, 0.75, 0.7] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute -left-5 top-0 text-[16px] text-cyan-100/90"
            animate={{ y: [0, -2, 0], x: [0, -1, 0], rotate: [-12, -5, -12] }}
            transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
          >
            ✧
          </motion.span>
          <motion.span
            className="absolute -right-5 top-0 text-[16px] text-cyan-100/90"
            animate={{ y: [0, -2, 0], x: [0, 1, 0], rotate: [12, 5, 12] }}
            transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
          >
            ✧
          </motion.span>
          <span className="text-[2.9rem] drop-shadow-[0_3px_8px_rgba(0,0,0,0.44)]">🧚‍♀️</span>
          <span className="absolute -bottom-1 left-[26px] text-[1.12rem]">📘</span>
        </div>
      </motion.div>
    );
  }

  if (mode === "jarOrbit") {
    return (
      <motion.div
        className={`pointer-events-none absolute z-30 ${className}`}
        animate={{
          x: [0, 48, 86, 48, 0, -48, -86, -48, 0],
          y: [-58, -36, 0, 38, 58, 38, 0, -36, -58],
          rotate: [-6, -2, 3, 5, 2, -2, -6, -8, -6],
          scale: [1, 1.02, 1.05, 1.02, 1, 0.98, 1, 1.01, 1],
        }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative">
          <motion.span
            className="absolute -left-[2px] top-9 h-7 w-16 rounded-full bg-cyan-300/45 blur-[3px]"
            animate={{ scaleX: [0.9, 1.05, 0.95, 1], opacity: [0.7, 1, 0.75, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute -left-8 top-0 text-[22px] text-cyan-100/90"
            animate={{ y: [0, -2, 0], x: [0, -1, 0], rotate: [-12, -4, -12] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            ✧
          </motion.span>
          <motion.span
            className="absolute -right-8 top-0 text-[22px] text-cyan-100/90"
            animate={{ y: [0, -2, 0], x: [0, 1, 0], rotate: [12, 4, 12] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            ✧
          </motion.span>
          <span className="text-[4.4rem] drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]">🧚‍♀️</span>
          <span className="absolute -bottom-1 left-[38px] text-[1.45rem]">📘</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`pointer-events-none absolute z-30 ${className}`}
      animate={{
        x: [0, 34, 62, 24, -14, -34, -6, 0],
        y: [0, -14, 3, 18, 11, -4, -15, 0],
        rotate: [-7, -3, 4, 2, -4, -7, -3, -7],
      }}
      transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        <motion.span
          className="absolute left-[1px] top-6 h-5 w-10 rounded-full bg-cyan-300/45 blur-[2px]"
          animate={{ scaleX: [0.9, 1.05, 0.95, 1], opacity: [0.7, 1, 0.75, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute -left-5 top-0 text-[16px] text-cyan-100/90"
          animate={{ y: [0, -2, 0], x: [0, -1, 0], rotate: [-12, -4, -12] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          ✧
        </motion.span>
        <motion.span
          className="absolute -right-5 top-0 text-[16px] text-cyan-100/90"
          animate={{ y: [0, -2, 0], x: [0, 1, 0], rotate: [12, 4, 12] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          ✧
        </motion.span>
        <span className="text-[2.65rem] drop-shadow-[0_3px_8px_rgba(0,0,0,0.45)]">🧚‍♀️</span>
        <span className="absolute -bottom-1 left-[24px] text-[1.05rem]">📘</span>
      </div>
    </motion.div>
  );
};

// CSS-only 3D Vietnamese bamboo fortune jar with sticks
export const FortuneSticks = ({ glowing = false, shaking = false, revealSticks = false }: { glowing?: boolean; shaking?: boolean; revealSticks?: boolean }) => {
  const sticks = [
    { id: 1, sway: 1.8, delay: 0.00, baseAngle: -12 },
    { id: 2, sway: 1.4, delay: 0.06, baseAngle: -8 },
    { id: 3, sway: 1.1, delay: 0.12, baseAngle: -5 },
    { id: 4, sway: 0.7, delay: 0.18, baseAngle: -2 },
    { id: 5, sway: 0.8, delay: 0.24, baseAngle: 2 },
    { id: 6, sway: 1.2, delay: 0.30, baseAngle: 5 },
    { id: 7, sway: 1.6, delay: 0.36, baseAngle: 8 },
    { id: 8, sway: 2.0, delay: 0.42, baseAngle: 12 },
  ];

  const moving = shaking || glowing || revealSticks;

  return (
    <motion.div
      className="jar-scene"
      initial={false}
      animate={
        shaking
          ? { y: [0, -16, 5, -10, 3, 0], scale: [1, 1.02, 0.99, 1.015, 1], rotate: [0, -2, 1.8, -1.3, 0.7, 0] }
          : { y: 0, scale: 1, rotate: 0 }
      }
      transition={{ duration: 0.42, repeat: shaking ? Infinity : 0, ease: 'easeInOut' }}
    >
      {/* Dark interior visible at jar mouth opening */}
      <div className="jar-interior" />

      {/* 8 sticks — z:3, jar body z:10 covers their lower halves */}
      <div className="jar-sticks-slot">
        {sticks.map((stick) => (
          <motion.div
            key={stick.id}
            className={`jar-stick jar-stick-${stick.id}`}
            animate={
              moving
                ? {
                    y: [0, -5 * (stick.sway / 2), 2, -3, 0],
                    rotate: [
                      stick.baseAngle,
                      stick.baseAngle + (stick.id % 2 === 0 ? -stick.sway * 0.6 : stick.sway * 0.6),
                      stick.baseAngle,
                    ],
                  }
                : { y: 0, rotate: stick.baseAngle }
            }
            transition={{
              duration: 0.38,
              repeat: moving ? Infinity : 0,
              delay: stick.delay,
              ease: 'easeInOut',
            }}
          >
            <span className="jar-stick-core" />
            <span className="jar-stick-grain" />
            <span className="jar-stick-cap" />
          </motion.div>
        ))}
      </div>

      {/* Jar body — opaque, starts below rim, covers stick bottoms (z:10) */}
      <div className="jar-body" />

      {/* Front engraved title */}
      <div className="jar-front-engraving" aria-hidden="true">
        <span>Gieo Quẻ</span>
        <span>Chọn Sách</span>
      </div>

      {/* Decorative carved band at jar shoulder */}
      <div className="jar-shoulder-band" />

      {/* Outer rim at the mouth opening */}
      <div className="jar-rim" />

      {/* Inner rim shadow for depth */}
      <div className="jar-rim-shadow" />

      {/* Flying sticks during reveal phase */}
      {revealSticks && (
        <>
          <motion.div
            className="jar-stick flying-stick"
            style={{ left: '41%', top: '-5%', width: '30px', height: '218px', zIndex: 50 }}
            initial={{ opacity: 1, y: 0, rotate: -7, scale: 0.95 }}
            animate={{ opacity: [1, 1, 1, 1, 0], y: [0, -185, 145, 176, 176], x: [0, -20, -16, -22, -22], rotate: [-7, -22, -38, -88, -88], scale: [0.95, 1.18, 1.05, 0.98, 0.98] }}
            transition={{ duration: 1.75, ease: 'easeInOut', times: [0, 0.32, 0.68, 0.84, 1] }}
          >
            <span className="jar-stick-core" />
            <span className="jar-stick-grain" />
            <span className="jar-stick-cap" />
          </motion.div>
          <motion.div
            className="jar-stick flying-stick"
            style={{ left: '47%', top: '-7%', width: '30px', height: '218px', zIndex: 50 }}
            initial={{ opacity: 1, y: 0, rotate: 0, scale: 0.95 }}
            animate={{ opacity: [1, 1, 1, 1, 0], y: [0, -220, 150, 182, 182], x: [0, 0, 2, 0, 0], rotate: [0, 12, 26, 90, 90], scale: [0.95, 1.24, 1.08, 1, 1] }}
            transition={{ duration: 1.82, ease: 'easeInOut', delay: 0.04, times: [0, 0.32, 0.69, 0.85, 1] }}
          >
            <span className="jar-stick-core" />
            <span className="jar-stick-grain" />
            <span className="jar-stick-cap" />
          </motion.div>
          <motion.div
            className="jar-stick flying-stick"
            style={{ left: '53%', top: '-5%', width: '30px', height: '218px', zIndex: 50 }}
            initial={{ opacity: 1, y: 0, rotate: 8, scale: 0.95 }}
            animate={{ opacity: [1, 1, 1, 1, 0], y: [0, -185, 145, 176, 176], x: [0, 20, 16, 24, 24], rotate: [8, 22, 40, 86, 86], scale: [0.95, 1.18, 1.05, 0.98, 0.98] }}
            transition={{ duration: 1.75, ease: 'easeInOut', delay: 0.08, times: [0, 0.32, 0.68, 0.84, 1] }}
          >
            <span className="jar-stick-core" />
            <span className="jar-stick-grain" />
            <span className="jar-stick-cap" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export const GoldParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${15 + (i * 7) % 70}%`,
            top: `${15 + (i * 11) % 70}%`,
            width: `${2 + (i % 3) * 2}px`,
            height: `${2 + (i % 3) * 2}px`,
            background: i % 2 === 0 
              ? `hsl(51, 100%, ${55 + (i % 3) * 10}%)` 
              : `hsl(43, 96%, ${50 + (i % 3) * 8}%)`,
            boxShadow: `0 0 ${4 + (i % 3) * 3}px hsl(51, 100%, 50% / 0.6)`,
          }}
          animate={{
            y: [0, -40 - (i % 5) * 15],
            x: [0, ((i % 7) - 3) * 12],
            opacity: [0, 1, 0],
            scale: [0, 1.5 + (i % 3) * 0.5, 0],
          }}
          transition={{
            duration: 2 + (i % 4) * 0.8,
            repeat: Infinity,
            delay: (i * 0.2) % 3,
          }}
        />
      ))}
    </div>
  );
};

export const CornerLanterns = () => (
  <>
    <motion.div 
      className="absolute top-2 left-2 text-xl z-20"
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      🏮
    </motion.div>
    <motion.div 
      className="absolute top-2 right-2 text-xl z-20"
      animate={{ rotate: [5, -5, 5] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      🏮
    </motion.div>
  </>
);
