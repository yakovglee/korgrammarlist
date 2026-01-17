import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Layers } from "lucide-react";
import { cn } from "@/lib/utils"; // Утилита для классов shadcn
import { grammarData } from "@/utils/grammarData";
import GrammarCard from "./GramarCard/GrammarCard";
import { Button } from "./ui/button";

const GrammarList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(grammarData.map((item) => item.level))),
    ];
  }, []);

  const filteredData = useMemo(() => {
    return grammarData.filter((item) => {
      const matchesSearch =
        item.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pos.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.main_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rel_category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.level === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-20 font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#F5F5F7]/85 backdrop-blur-xl border-b border-gray-200/40">
        <div className="max-w-2xl mx-auto px-6 pt-8 pb-4">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                Грамматика
              </h1>
              <p className="text-sm text-[#86868b]">한국어능력시험</p>
            </div>
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Layers size={18} className="text-blue-500" />
            </div>
          </header>

          {/* Поиск */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]"
              size={18}
            />
            <Input
              placeholder="Поиск грамматики..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-gray-200/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20"
            />
          </div>

          {/* Фильтр-батончики (Pill Filters) */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-[#1d1d1f] text-white shadow-md"
                    : "bg-white text-[#1d1d1f] hover:bg-white/80 border border-gray-200"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Список карточек */}
      <div className="max-w-2xl mx-auto px-6 mt-6">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GrammarCard item={item} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-gray-400"
              >
                <Search className="mx-auto mb-3 opacity-20" size={48} />
                <p>Ничего не найдено в этой категории</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GrammarList;
