import { motion } from "framer-motion";
import { booksData } from "@/pages/Index";
import { CornerLanterns } from "@/components/DecorativeElements";

interface Props {
  onViewDetail: (index: number) => void;
  onRetry: () => void;
  onExit?: () => void;
}

const BookCard = ({ book, index, onView }: { book: typeof booksData[0]; index: number; onView: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }}
    animate={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ delay: index * 0.25 + 0.2, duration: 0.6, ease: "easeOut" }}
    className="parchment-bg rounded-2xl p-4 shadow-xl relative overflow-hidden"
    style={{
      border: '2px solid',
      borderImage: 'linear-gradient(135deg, hsl(51, 100%, 55% / 0.6), hsl(43, 96%, 42% / 0.3), hsl(51, 100%, 50% / 0.6)) 1',
    }}
  >
    {/* Decorative corner */}
    <div className="absolute top-1 right-2 text-primary/20 text-xs">❧</div>
    <div className="absolute bottom-1 left-2 text-primary/20 text-xs rotate-180">❧</div>
    
    <div className="flex gap-3">
      {/* Book Cover - Real Image */}
      <div className="w-[72px] h-[100px] rounded-lg overflow-hidden shadow-lg flex-shrink-0 border border-primary/20">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-bold text-accent leading-tight">{book.title}</h3>
        <p className="text-card-foreground/60 text-xs mb-1.5">Tác giả: {book.author}</p>
        <p className="text-card-foreground/70 text-xs italic line-clamp-2 leading-relaxed">{book.quote}</p>
      </div>
    </div>
    <motion.button
      onClick={onView}
      whileTap={{ scale: 0.95 }}
      className="mt-3 w-full py-2.5 rounded-xl gold-gradient text-primary-foreground font-display font-semibold text-sm shadow-lg relative overflow-hidden"
    >
      <span className="relative z-10">Xem chi tiết →</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
    </motion.button>
  </motion.div>
);

const Screen4Results = ({ onViewDetail, onRetry, onExit }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <CornerLanterns />
      
      <motion.div 
        className="text-center mt-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-2xl font-extrabold gold-text text-shadow-gold">Quẻ Sách Của Bạn</h1>
        <p className="text-tet-cream-text text-sm mt-1 font-light italic">Ba cuốn sách hữu duyên ✨</p>
      </motion.div>

      <div className="w-full space-y-3">
        {booksData.map((book, i) => (
          <BookCard key={i} book={book} index={i} onView={() => onViewDetail(i)} />
        ))}
      </div>

      <div className="flex w-full gap-3 mt-2">
        {onExit ? (
          <motion.button
            onClick={onExit}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex-1 py-3.5 rounded-2xl border-2 border-red-500 bg-red-700/20 text-yellow-300 font-display font-bold text-base hover:bg-red-700/35 transition-all active:scale-95 text-center"
          >
            ✕ Thoát
          </motion.button>
        ) : (
          <div className="flex-1" />
        )}

        <motion.button
          onClick={onRetry}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex-1 py-3.5 rounded-2xl border-2 border-red-500 bg-red-700/20 text-yellow-300 font-display font-bold text-base hover:bg-red-700/35 transition-all active:scale-95 text-center"
        >
          ⟳ Thử lại
        </motion.button>
      </div>
    </div>
  );
};

export default Screen4Results;
