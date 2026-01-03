import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Sparkles, GraduationCap, Search, X, Layers } from 'lucide-react';
import { cn } from "@/lib/utils"; // Утилита для классов shadcn

const grammarData = [
  { id: "p-perf", category: "Tenses", title: "Present Perfect", formula: "Have/Has + V3", usage: "Результат в настоящем.", example: "I have lost my keys." },
  { id: "cond-1", category: "Conditionals", title: "First Conditional", formula: "If + Pres. Simple, Will + V1", usage: "Реальное будущее.", example: "If it rains, we'll stay home." },
  { id: "pass-v", category: "Voice", title: "Passive Voice", formula: "Be + V3", usage: "Акцент на объекте.", example: "The book was written in 1920." },
  { id: "rep-sp", category: "Speech", title: "Reported Speech", formula: "V2 -> Had + V3", usage: "Пересказ слов.", example: "He said he had finished." },
  { id: "fut-s", category: "Tenses", title: "Future Simple", formula: "Will + V1", usage: "Спонтанные решения.", example: "I will call you back." }
];

const GrammarList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Автоматически получаем список категорий из данных
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(grammarData.map(item => item.category)))];
  }, []);

  // Двойная фильтрация: по поиску и по категории
  const filteredData = useMemo(() => {
    return grammarData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.usage.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
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
              <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">Грамматика</h1>
              <p className="text-sm text-[#86868b]">Подготовка к экзамену</p>
            </div>
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Layers size={18} className="text-blue-500" />
            </div>
          </header>
          
          {/* Поиск */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" size={18} />
            <Input 
              placeholder="Поиск правил..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-gray-200/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20"
            />
          </div>

          {/* Фильтр-батончики (Pill Filters) */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
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
              </button>
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
                  <Card className="border-none shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-[22px] overflow-hidden bg-white">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={item.id} className="border-none">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline">
                          <div className="flex flex-col items-start text-left">
                            <span className="text-[9px] font-black uppercase tracking-[0.1em] text-blue-500 mb-1">{item.category}</span>
                            <span className="text-lg font-semibold text-[#1d1d1f] tracking-tight">{item.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-5">
                          <div className="space-y-4 border-t border-gray-50 pt-4">
                            <div className="grid grid-cols-1 gap-3">
                              <div className="p-3 bg-blue-50/50 rounded-2xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <Sparkles size={12} className="text-blue-500" />
                                  <span className="text-[10px] font-bold text-gray-400 uppercase">Формула</span>
                                </div>
                                <code className="text-sm font-mono font-semibold text-blue-700">{item.formula}</code>
                              </div>
                              
                              <div className="p-3 bg-gray-50 rounded-2xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <BookOpen size={12} className="text-gray-400" />
                                  <span className="text-[10px] font-bold text-gray-400 uppercase">Пример</span>
                                </div>
                                <p className="text-sm italic text-[#1d1d1f]">"{item.example}"</p>
                              </div>
                            </div>
                            <p className="text-xs text-[#86868b] leading-relaxed px-1">
                              {item.usage}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-400">
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