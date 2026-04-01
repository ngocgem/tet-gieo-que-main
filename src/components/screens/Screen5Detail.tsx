import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { BookData } from "@/pages/Index";
import { CornerLanterns } from "@/components/DecorativeElements";

interface Props {
  book: BookData;
  onBack: () => void;
}

const Screen5Detail = ({ book, onBack }: Props) => {
  return (
    <div className="flex flex-col gap-4 relative">
      <CornerLanterns />
      
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileTap={{ scale: 0.92 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-500 bg-red-800/85 text-yellow-200 font-bold text-sm shadow-lg hover:bg-red-800/95 hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/80"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại</span>
      </motion.button>

      {/* Book Header */}
      <motion.div 
        className="flex gap-4 items-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-28 h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-primary/30 flex-shrink-0">
          <img 
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="font-display text-xl font-extrabold gold-text text-shadow-gold">{book.title}</h1>
          <p className="text-tet-cream-text text-sm mt-1">
            Tác giả: <span className="font-semibold">{book.author}</span>
          </p>
          <div className="flex gap-0.5 mt-2 text-primary text-sm">
            {"★★★★★".split("").map((s, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quote - parchment style */}
      <motion.div 
        className="parchment-bg rounded-2xl p-4 italic text-center relative"
        style={{
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, hsl(51, 100%, 55% / 0.5), hsl(43, 96%, 42% / 0.3), hsl(51, 100%, 50% / 0.5)) 1',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute top-1 left-2 text-primary/25 text-lg font-display">"</div>
        <div className="absolute bottom-1 right-2 text-primary/25 text-lg font-display">"</div>
        <p className="text-card-foreground text-sm leading-relaxed px-4">{book.quote}</p>
      </motion.div>

      {/* Summary - scroll style */}
      <motion.div 
        className="scroll-bg rounded-2xl p-5 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-display text-base font-bold text-accent mb-3 flex items-center gap-2">
          <span>📜</span> TÓM TẮT NỘI DUNG
        </h2>
        <p className="text-card-foreground text-sm leading-relaxed">{book.summary}</p>
      </motion.div>

    </div>
  );
};

export default Screen5Detail;
