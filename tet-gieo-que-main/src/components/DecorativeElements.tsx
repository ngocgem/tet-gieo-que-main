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

// Dense fortune sticks with Vietnamese motif (hoa mai instead of Chinese character)
export const FortuneSticks = ({ glowing = false, shaking = false, revealSticks = false }: { glowing?: boolean; shaking?: boolean; revealSticks?: boolean }) => {
  // Generate 25 sticks for dense look
  const stickAngles = Array.from({ length: 25 }, (_, i) => {
    const spread = 50; // degrees total spread
    return -spread / 2 + (spread / 24) * i + (Math.sin(i * 1.7) * 3);
  });

  return (
    <div className="relative w-56 h-80 mx-auto">
      {/* Red platform/base */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-6 rounded-[50%]" style={{
        background: 'radial-gradient(ellipse, hsl(0, 70%, 40%) 0%, hsl(0, 65%, 30%) 60%, hsl(0, 60%, 20%) 100%)',
        boxShadow: '0 4px 12px hsl(0,0%,0%,0.4)',
      }} />
      {/* Shadow under platform */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-4 rounded-full bg-black/40 blur-lg" />
      
      {/* Cup body - 3D red lacquer Vietnamese style */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-40 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            hsl(0, 75%, 45%) 0%, 
            hsl(0, 70%, 38%) 15%, 
            hsl(0, 65%, 30%) 40%, 
            hsl(0, 70%, 35%) 70%, 
            hsl(0, 75%, 42%) 100%
          )`,
          boxShadow: `
            inset -10px 0 20px hsl(0, 60%, 15%),
            inset 10px 0 20px hsl(0, 70%, 50% / 0.3),
            0 6px 20px hsl(0, 0%, 0% / 0.5),
            0 2px 8px hsl(0, 0%, 0% / 0.3)
          `,
          clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
        }}
      >
        {/* Lacquer texture */}
        <div className="absolute inset-0" style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 6px, hsl(0, 50%, 25% / 0.15) 6px, transparent 8px)`,
        }} />
        {/* Highlight reflection */}
        <div className="absolute top-0 left-3 w-4 h-full" style={{
          background: `linear-gradient(180deg, hsl(0, 70%, 55% / 0.5), transparent 50%)`,
        }} />
        {/* Gold rim top */}
        <div className="absolute top-0 w-full h-2" style={{
          background: `linear-gradient(180deg, hsl(51, 100%, 55%), hsl(43, 96%, 42%))`,
          boxShadow: '0 2px 4px hsl(0,0%,0%,0.3)',
        }} />
        {/* Gold band below rim */}
        <div className="absolute top-4 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Vietnamese Hoa Mai motif */}
        <div className="absolute top-7 left-1/2 -translate-x-1/2 select-none flex flex-col items-center gap-1">
          <span className="text-primary/60 text-lg" style={{ textShadow: '0 1px 4px hsl(0,0%,0%,0.5)' }}>✿</span>
          <div className="flex gap-1">
            <span className="text-primary/30 text-[8px]">❀</span>
            <span className="text-primary/40 text-[10px]">✿</span>
            <span className="text-primary/30 text-[8px]">❀</span>
          </div>
        </div>
        
        {/* Bottom gold band */}
        <div className="absolute bottom-8 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* Gold band at very bottom */}
        <div className="absolute bottom-0 w-full h-2" style={{
          background: `linear-gradient(0deg, hsl(51, 100%, 55%), hsl(43, 96%, 42%))`,
        }} />
        {/* Additional decorative hoa mai */}
        <div className="absolute bottom-12 left-5 text-primary/25 text-xs">❀</div>
        <div className="absolute bottom-14 right-5 text-primary/25 text-xs">❀</div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-primary/15 text-[8px]">✿</div>
      </div>
      
      {/* Dense sticks - 25 sticks */}
      {stickAngles.map((rotation, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[145px] left-1/2 origin-bottom"
          style={{
            width: `${3 + (i % 3)}px`,
            height: `${110 + (i % 5) * 14}px`,
            background: `linear-gradient(to top, hsl(43, 60%, 55%), hsl(51, 80%, 68%), hsl(43, 70%, 60%))`,
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            boxShadow: `1px 0 2px hsl(0,0%,0%,0.15)`,
            borderRadius: '2px 2px 0 0',
            zIndex: i % 2 === 0 ? 1 : 0,
          }}
          animate={
            revealSticks && (i === 5 || i === 12 || i === 20)
              ? { y: -80, opacity: [1, 1, 0], scale: [1, 1.2, 0.8] }
              : glowing
              ? { filter: ["brightness(1)", "brightness(1.6)", "brightness(1)"] }
              : shaking
              ? { x: [0, -2, 3, -1, 2, 0] }
              : {}
          }
          transition={
            revealSticks && (i === 5 || i === 12 || i === 20)
              ? { duration: 1, delay: [5, 12, 20].indexOf(i) * 0.3, ease: "easeOut" }
              : { duration: glowing ? 1.5 : 0.3, repeat: Infinity, delay: i * 0.06 }
          }
        >
          {/* Red tip */}
          <div style={{
            width: `${4 + (i % 3)}px`,
            height: '6px',
            marginLeft: '-0.5px',
            borderRadius: '2px 2px 0 0',
            background: `linear-gradient(to top, hsl(0, 70%, 40%), hsl(0, 80%, 55%), hsl(0, 70%, 45%))`,
            boxShadow: glowing ? `0 -3px 8px hsl(0, 80%, 50% / 0.5)` : 'none',
          }} />
        </motion.div>
      ))}
      
      {/* Glow effect */}
      {glowing && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 50% 40%, hsl(51, 100%, 50%, 0.25) 0%, transparent 60%)",
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 60%, hsl(51, 100%, 60%, 0.15) 0%, transparent 40%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </div>
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
