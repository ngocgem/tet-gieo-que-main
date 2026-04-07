import { useEffect } from "react";
import { motion } from "framer-motion";
import { CornerLanterns } from "@/components/DecorativeElements";

interface Props {
  onNext: () => void;
}

const Screen3Loading = ({ onNext }: Props) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onNext();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center pt-8 pb-4 relative min-h-[70vh] overflow-hidden">
      <CornerLanterns />

      <div className="relative w-full flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full h-10" />

        <motion.p
          className="text-center px-4 text-tet-cream-text text-xl leading-relaxed font-bold tracking-wide"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Đang kết nối duyên lành.. Hãy chuẩn bị lắc máy nhé.
        </motion.p>

        <div className="w-[78%] max-w-sm mt-5">
          <div className="h-2.5 rounded-full bg-black/25 border border-primary/30 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(51, 100%, 50%), hsl(43, 96%, 42%), hsl(51, 100%, 55%))" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-6 text-tet-cream-text underline underline-offset-4 text-base font-semibold hover:text-primary transition-colors"
      >
        Bỏ qua
      </button>
    </div>
  );
};

export default Screen3Loading;
