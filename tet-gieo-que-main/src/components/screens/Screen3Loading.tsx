import { useEffect } from "react";
import { motion } from "framer-motion";
import { CornerLanterns, GoldParticles } from "@/components/DecorativeElements";
import { Hand, Smartphone } from "lucide-react";

interface Props {
  onNext: () => void;
}

const Screen3Loading = ({ onNext }: Props) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onNext();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center gap-6 pt-8 pb-4 relative min-h-[70vh]">
      <CornerLanterns />
      
      <div className="text-center px-4 mt-6">
        <motion.p
          className="text-tet-cream-text text-lg leading-relaxed font-light"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Đang kết nối duyên lành... Hãy chuẩn bị lắc máy nhé!
        </motion.p>
      </div>

      <div className="relative my-8">
        <GoldParticles />
        <motion.div
          className="relative"
          animate={{ x: [-18, 18, -18] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-16 h-24 rounded-2xl bg-primary/15 border border-primary/40 backdrop-blur-sm flex items-center justify-center"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Smartphone className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.div
            className="absolute -left-8 top-8 text-primary"
            animate={{ x: [-6, 6, -6], y: [0, -2, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Hand className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      <p className="text-tet-cream-text/60 text-xs italic text-center px-6">
        Mẹo: Lắc nhẹ và đều để quẻ hiện nhanh hơn.
      </p>

      <button
        type="button"
        onClick={onNext}
        className="mt-auto text-tet-cream-text/80 underline underline-offset-4 text-sm hover:text-primary transition-colors"
      >
        Bỏ qua
      </button>
    </div>
  );
};

export default Screen3Loading;
