import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Пример данных (замени на свои правила грамматики)
const grammarData = [
  {
    id: 1,
    title: "Present Perfect",
    formula: "Have/Has + V3",
    usage: "Действие завершилось в прошлом, но имеет связь с настоящим.",
    example: "I have already finished my homework.",
  },
  {
    id: 2,
    title: "Conditionals (Type 1)",
    formula: "If + Present Simple, will + Verb",
    usage: "Реальные условия в будущем.",
    example: "If it rains, we will stay at home.",
  },
  {
    id: 3,
    title: "Passive Voice",
    formula: "To be + V3",
    usage: "Когда само действие важнее того, кто его совершает.",
    example: "The letter was sent yesterday.",
  },
];

const GrammarCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const progress = ((currentIndex + 1) / grammarData.length) * 100;

  const handleNext = () => {
    if (currentIndex < grammarData.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F7] p-6 font-sans">
      {/* Header в стиле Apple */}
      <div className="w-full max-w-md mb-8">
        <h1 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
          Грамматика
        </h1>
        <p className="text-[#86868b] mt-2">Подготовка к экзамену</p>
        <Progress value={progress} className="h-1 mt-4 bg-gray-200" />
      </div>

      <div className="relative w-full max-w-md h-[400px] perspective-1000">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full h-full relative"
            >
              {/* Лицевая сторона: Правило */}
              <Card className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 backface-hidden shadow-xl rounded-[28px] border-none bg-white">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">
                  Rule
                </span>
                <h2 className="text-4xl font-bold text-center text-[#1d1d1f]">
                  {grammarData[currentIndex].title}
                </h2>
                <div className="absolute bottom-8 text-[#86868b] flex items-center gap-2">
                  <RotateCcw size={14} /> Нажми, чтобы перевернуть
                </div>
              </Card>

              {/* Обратная сторона: Детали */}
              <Card
                className="absolute inset-0 w-full h-full flex flex-col p-8 backface-hidden shadow-xl rounded-[28px] border-none bg-white/80 backdrop-blur-md"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-medium text-gray-400 uppercase">
                      Формула
                    </label>
                    <p className="text-xl font-mono text-blue-600 bg-blue-50 p-3 rounded-xl mt-1">
                      {grammarData[currentIndex].formula}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-400 uppercase">
                      Использование
                    </label>
                    <p className="text-[#1d1d1f] leading-relaxed">
                      {grammarData[currentIndex].usage}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="italic text-sm text-gray-600 underline decoration-blue-200">
                      "{grammarData[currentIndex].example}"
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Навигация */}
      <div className="flex gap-4 mt-12">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="rounded-full w-12 h-12 bg-white border-none shadow-sm hover:shadow-md transition-shadow"
        >
          <ChevronLeft className="text-[#1d1d1f]" />
        </Button>

        <div className="flex items-center px-4 bg-white rounded-full shadow-sm text-sm font-medium">
          {currentIndex + 1} / {grammarData.length}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentIndex === grammarData.length - 1}
          className="rounded-full w-12 h-12 bg-white border-none shadow-sm hover:shadow-md transition-shadow"
        >
          <ChevronRight className="text-[#1d1d1f]" />
        </Button>
      </div>
    </div>
  );
};

export default GrammarCards;
