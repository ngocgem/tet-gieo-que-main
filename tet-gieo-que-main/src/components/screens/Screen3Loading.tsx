import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FortuneSticks, GoldParticles, CornerLanterns } from "@/components/DecorativeElements";

interface Props {
  onNext: () => void;
}

const Screen3Loading = ({ onNext }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onNext(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center gap-6 pt-8 relative">
      <CornerLanterns />
      
      <div className="text-center">
        <motion.h2 
          className="font-display text-2xl font-extrabold gold-text text-shadow-gold mb-3 tracking-wide"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ĐANG GỌI DUYÊN...
        </motion.h2>
        <p className="text-tet-cream-text text-sm leading-relaxed font-light px-4">
          Duyên lành đang tìm đến bạn
        </p>
        <p className="text-tet-cream-text/60 text-xs mt-1 italic">
          Lòng thành thì duyên sẽ đến 🙏
        </p>
      </div>

      <div className="relative my-4">
        <GoldParticles />
        <motion.div
          animate={{ y: [0, -3, 0, 2, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <FortuneSticks glowing />
        </motion.div>
      </div>

      {/* Glowing Progress bar */}
      <div className="w-64 mx-auto">
        <div className="h-2.5 bg-muted rounded-full overflow-hidden border border-primary/30 relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(51, 100%, 50%), hsl(43, 96%, 42%), hsl(51, 100%, 55%))',
            }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          </motion.div>
          {/* Glow on progress bar */}
          <div 
            className="absolute top-0 h-full rounded-full transition-all duration-100"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px hsl(51, 100%, 50% / 0.5), 0 0 20px hsl(51, 100%, 50% / 0.3)',
            }} 
          />
        </div>
        <p className="text-primary text-sm text-center mt-2 font-bold font-display">{progress}%</p>
      </div>

      <div className="flex gap-2 text-primary">
        {"✦ ✦ ✦ ✦ ✦".split(" ").map((s, i) => (
          <motion.span 
            key={i} 
            className="text-sm"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Screen3Loading;
