import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Lantern, CornerLanterns } from "@/components/DecorativeElements";

const purposes = ["Để thư giãn", "Đầu tư bản thân", "Tăng tri thức", "Giải trí", "Tìm cảm hứng", "Phát triển sự nghiệp", "Hiểu bản thân", "Nuôi dạy con"];
const genres = ["Văn học", "Kinh doanh", "Tâm lý", "Lịch sử", "Kỹ năng sống", "Khoa học", "Văn hóa", "Tâm linh", "Thiếu nhi", "Triết học", "Tiểu thuyết", "Thơ ca", "Hồi ký", "Công nghệ", "Nghệ thuật"];
const lengths = ["Ngắn", "Trung bình", "Dài"];

const INITIAL_PURPOSE_COUNT = 3;
const INITIAL_GENRE_COUNT = 6;

interface Props {
  onNext: () => void;
}

const Chip = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.92 }}
    layout
    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
      selected
        ? "bg-accent text-accent-foreground border-primary shadow-md glow-gold"
        : "bg-card/50 text-card-foreground border-tet-parchment-dark/50 hover:border-primary/50 hover:bg-card/70"
    }`}
  >
    {selected && <span className="mr-1">✓</span>}
    {label}
  </motion.button>
);

const ExpandButton = ({ expanded, onClick, moreCount }: { expanded: boolean; onClick: () => void; moreCount: number }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.92 }}
    className="px-3.5 py-2 rounded-full text-sm font-medium border border-dashed border-primary/40 text-primary/70 hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 flex items-center gap-1"
  >
    {expanded ? (
      <>Thu gọn <ChevronUp className="w-3.5 h-3.5" /></>
    ) : (
      <>+{moreCount} <ChevronDown className="w-3.5 h-3.5" /></>
    )}
  </motion.button>
);

const Screen1Selection = ({ onNext }: Props) => {
  const [purpose, setPurpose] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [length, setLength] = useState<string>("");
  const [showAllPurposes, setShowAllPurposes] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(false);

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 3 ? [...prev, g] : prev
    );
  };

  const visiblePurposes = showAllPurposes ? purposes : purposes.slice(0, INITIAL_PURPOSE_COUNT);
  const visibleGenres = showAllGenres ? genres : genres.slice(0, INITIAL_GENRE_COUNT);

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <CornerLanterns />
      
      {/* Title */}
      <div className="flex items-center gap-3 mt-4">
        <Lantern />
        <div className="text-center">
          <h1 className="font-display text-3xl font-extrabold gold-text text-shadow-gold tracking-wide">
            Gieo Quẻ
          </h1>
          <p className="text-tet-cream-text text-sm font-light mt-1 tracking-wider">
            Đầu Năm · Chọn Sách Hữu Duyên
          </p>
        </div>
        <Lantern />
      </div>

      {/* Parchment Card */}
      <motion.div 
        className="w-full parchment-bg rounded-2xl p-5 space-y-5 relative overflow-hidden"
        style={{
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, hsl(51, 100%, 55%), hsl(43, 96%, 42%), hsl(51, 100%, 50%)) 1',
          boxShadow: '0 4px 20px hsl(0, 0%, 0% / 0.3), inset 0 1px 0 hsl(36, 60%, 95%)',
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Corner decorations */}
        <div className="absolute top-1 left-2 text-primary/30 text-xs">❧</div>
        <div className="absolute top-1 right-2 text-primary/30 text-xs rotate-180">❧</div>
        <div className="absolute bottom-1 left-2 text-primary/30 text-xs rotate-180">❧</div>
        <div className="absolute bottom-1 right-2 text-primary/30 text-xs">❧</div>
        
        {/* Mục Đích Đọc */}
        <div>
          <h2 className="font-display text-base font-bold text-accent mb-2.5 flex items-center gap-2">
            <span className="text-lg">📚</span> Mục Đích Đọc
          </h2>
          <motion.div className="flex flex-wrap gap-2" layout>
            <AnimatePresence>
              {visiblePurposes.map((p) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Chip label={p} selected={purpose === p} onClick={() => setPurpose(p)} />
                </motion.div>
              ))}
            </AnimatePresence>
            {purposes.length > INITIAL_PURPOSE_COUNT && (
              <ExpandButton
                expanded={showAllPurposes}
                onClick={() => setShowAllPurposes(!showAllPurposes)}
                moreCount={purposes.length - INITIAL_PURPOSE_COUNT}
              />
            )}
          </motion.div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Thể Loại Sách - Multi-select */}
        <div>
          <h2 className="font-display text-base font-bold text-accent mb-2.5 flex items-center gap-2">
            <span className="text-lg">📖</span> Thể Loại Sách
            <span className="text-xs font-normal text-card-foreground/50 font-body">(chọn tối đa 3)</span>
          </h2>
          <motion.div className="flex flex-wrap gap-2" layout>
            <AnimatePresence>
              {visibleGenres.map((g) => (
                <motion.div
                  key={g}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Chip label={g} selected={selectedGenres.includes(g)} onClick={() => toggleGenre(g)} />
                </motion.div>
              ))}
            </AnimatePresence>
            {genres.length > INITIAL_GENRE_COUNT && (
              <ExpandButton
                expanded={showAllGenres}
                onClick={() => setShowAllGenres(!showAllGenres)}
                moreCount={genres.length - INITIAL_GENRE_COUNT}
              />
            )}
          </motion.div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Độ Dài Mong Muốn */}
        <div>
          <h2 className="font-display text-base font-bold text-accent mb-2.5 flex items-center gap-2">
            <span className="text-lg">📏</span> Độ Dài Mong Muốn
          </h2>
          <div className="flex flex-wrap gap-2">
            {lengths.map((l) => (
              <Chip key={l} label={l} selected={length === l} onClick={() => setLength(l)} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        onClick={onNext}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="w-full py-4 rounded-2xl font-display text-lg font-bold gold-gradient text-primary-foreground shadow-xl transition-all duration-300 animate-pulse-glow relative overflow-hidden"
      >
        <span className="relative z-10">🪷 BẮT ĐẦU GIEO DUYÊN 🪷</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      </motion.button>

      <div className="flex gap-2 text-primary/60 text-xs items-center">
        <span>🌸</span>
        <span className="font-light italic">Hãy chọn theo trực giác của bạn</span>
        <span>🌸</span>
      </div>
    </div>
  );
};

export default Screen1Selection;
