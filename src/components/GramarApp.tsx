import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, Search, X, PlayCircle } from "lucide-react";

// Тот же массив данных
const grammarData = [
  {
    id: "p-perf",
    category: "Tenses",
    title: "Present Perfect",
    formula: "Have/Has + V3",
    usage: "Результат в настоящем.",
    example: "I have lost my keys.",
  },
  {
    id: "cond-1",
    category: "Conditionals",
    title: "First Conditional",
    formula: "If + Pres. Simple, Will + V1",
    usage: "Реальное будущее.",
    example: "If it rains, we'll stay home.",
  },
  {
    id: "pass-v",
    category: "Voice",
    title: "Passive Voice",
    formula: "Be + V3",
    usage: "Акцент на объекте.",
    example: "The book was written in 1920.",
  },
  {
    id: "rep-sp",
    category: "Speech",
    title: "Reported Speech",
    formula: "V2 -> Had + V3",
    usage: "Пересказ слов.",
    example: "He said he had finished.",
  },
];

const GrammarApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [quizCard, setQuizCard] = useState<(typeof grammarData)[0] | null>(
    null
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(grammarData.map((item) => item.category))),
  ];

  const filteredData = useMemo(() => {
    return grammarData.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const startQuiz = () => {
    const randomCard =
      grammarData[Math.floor(Math.random() * grammarData.length)];
    setQuizCard(randomCard);
    setShowAnswer(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-20 overflow-x-hidden">
      {/* Quiz Modal */}
      <AnimatePresence>
        {quizCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm"
            >
              <Card className="p-8 shadow-2xl border-none rounded-[40px] bg-white text-center relative overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuizCard(null)}
                  className="absolute top-4 right-4 rounded-full"
                >
                  <X size={20} />
                </Button>

                <div className="mb-6 flex justify-center">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <GraduationCap size={32} />
                  </div>
                </div>

                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Назови формулу для:
                </h3>
                <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">
                  {quizCard.title}
                </h2>

                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {!showAnswer ? (
                      <motion.div
                        key="question"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <p className="text-[#86868b] text-sm italic mb-10">
                          "
                          {quizCard.example.replace(
                            quizCard.title.split(" ")[0],
                            "____"
                          )}
                          "
                        </p>
                        <Button
                          onClick={() => setShowAnswer(true)}
                          className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-semibold"
                        >
                          Показать ответ
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                          <p className="text-green-700 font-mono text-lg font-bold">
                            {quizCard.formula}
                          </p>
                        </div>
                        <Button
                          onClick={startQuiz}
                          className="w-full h-14 bg-[#1d1d1f] rounded-2xl"
                        >
                          Следующая
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 pt-12">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight">
              Grammar
            </h1>
            <p className="text-[#86868b]">Master your exam rules</p>
          </div>
          <Button
            onClick={startQuiz}
            className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 gap-2"
          >
            <PlayCircle size={18} /> Квиз
          </Button>
        </header>

        {/* Search & Categories */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-none shadow-sm rounded-2xl"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#1d1d1f] text-white"
                    : "bg-white text-gray-500 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filteredData.map((item) => (
            <Card
              key={item.id}
              className="border-none shadow-sm rounded-[24px] overflow-hidden"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={item.id} className="border-none">
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <span className="font-semibold text-[#1d1d1f]">
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    <div className="bg-blue-50/50 p-4 rounded-2xl mb-4 text-blue-700 font-mono text-sm">
                      {item.formula}
                    </div>
                    <p className="text-sm text-gray-600 italic px-1">
                      "{item.example}"
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrammarApp;
