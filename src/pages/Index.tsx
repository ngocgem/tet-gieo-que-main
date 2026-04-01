import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FallingPetals, FloatingClouds, GoldBorderTop, GoldBorderBottom } from "@/components/DecorativeElements";
import Screen1Selection from "@/components/screens/Screen1Selection";
import Screen2Shake from "@/components/screens/Screen2Shake";

import Screen4Results from "@/components/screens/Screen4Results";
import Screen5Detail from "@/components/screens/Screen5Detail";

import bookChiPheo from "@/assets/book-chi-pheo.jpg";
import bookHieuVeTraiTim from "@/assets/book-hieu-ve-trai-tim.jpg";
import bookNhaGiaKim from "@/assets/book-nha-gia-kim.jpg";

export type AppScreen = 1 | 2 | 4 | 5;

export interface BookData {
  title: string;
  author: string;
  quote: string;
  summary: string;
  coverImage: string;
  coverColor: string;
}

export const booksData: BookData[] = [
  {
    title: "Chí Phèo",
    author: "Nam Cao",
    quote: "\"Ai cho tao lương thiện? Làm thế nào cho mất được những vết mảnh chai trên mặt này?\"",
    summary: "Chí Phèo là một truyện ngắn nổi tiếng của nhà văn Nam Cao, kể về cuộc đời bi kịch của một người nông dân bị xã hội phong kiến đẩy vào con đường tha hóa. Từ một anh canh điền hiền lành, Chí Phèo bị Bá Kiến đẩy vào tù, rồi trở thành một kẻ say rượu, chuyên rạch mặt ăn vạ. Cuộc gặp gỡ với Thị Nở đã thắp lên trong Chí khao khát được sống lương thiện, nhưng định kiến xã hội đã dập tắt tia hy vọng cuối cùng. Tác phẩm là lời tố cáo mạnh mẽ xã hội thực dân phong kiến, đồng thời thể hiện niềm tin vào bản chất tốt đẹp của con người.",
    coverImage: bookChiPheo,
    coverColor: "from-amber-900 to-amber-700",
  },
  {
    title: "Hiểu Về Trái Tim",
    author: "Minh Niệm",
    quote: "\"Hạnh phúc không phải là đích đến, mà là cách bạn đi trên hành trình.\"",
    summary: "Hiểu Về Trái Tim là cuốn sách về tâm lý và phát triển bản thân của thiền sư Minh Niệm. Cuốn sách giúp người đọc hiểu rõ hơn về cảm xúc, tâm trí và cách sống an lạc trong cuộc sống hiện đại. Với ngôn ngữ giản dị nhưng sâu sắc, tác giả chia sẻ những bài học về lòng từ bi, sự tha thứ và cách chữa lành những tổn thương tâm hồn.",
    coverImage: bookHieuVeTraiTim,
    coverColor: "from-rose-800 to-rose-600",
  },
  {
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    quote: "\"Khi bạn khao khát điều gì, cả vũ trụ sẽ hợp lực giúp bạn đạt được nó.\"",
    summary: "Nhà Giả Kim kể về hành trình của Santiago, một cậu bé chăn cừu người Tây Ban Nha, rời bỏ quê hương để theo đuổi giấc mơ tìm kho báu ở Kim tự tháp Ai Cập. Trên đường đi, cậu gặp nhiều người thầy, học được nhiều bài học quý giá về cuộc sống, tình yêu và vận mệnh. Cuốn sách là một câu chuyện ngụ ngôn đẹp về việc lắng nghe tiếng nói con tim và dũng cảm theo đuổi ước mơ.",
    coverImage: bookNhaGiaKim,
    coverColor: "from-yellow-700 to-amber-600",
  },
];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(1);
  const [selectedBook, setSelectedBook] = useState<number>(0);

  const goToScreen = (screen: AppScreen) => setCurrentScreen(screen);

  return (
    <div className="min-h-screen tet-gradient relative overflow-hidden font-body">
      <FallingPetals />
      <FloatingClouds />
      <div className="relative z-10 min-h-screen flex flex-col max-w-md mx-auto">
        <GoldBorderTop />
        <div className="flex-1 px-4 py-2 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentScreen === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <Screen1Selection onNext={() => goToScreen(2)} />
              </motion.div>
            )}
            {currentScreen === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <Screen2Shake onNext={() => goToScreen(4)} onBack={() => goToScreen(1)} />
              </motion.div>
            )}
            {currentScreen === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <Screen4Results
                  onViewDetail={(idx) => { setSelectedBook(idx); goToScreen(5); }}
                  onRetry={() => goToScreen(2)}
                  onExit={() => goToScreen(1)}
                />
              </motion.div>
            )}
            {currentScreen === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }}>
                <Screen5Detail
                  book={booksData[selectedBook]}
                  onBack={() => goToScreen(4)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <GoldBorderBottom />
      </div>
    </div>
  );
};

export default Index;
