import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Sparkles, BookOpen, Maximize2 } from "lucide-react";
import { Card } from "../ui/card";
import type { GrammarType } from "@/utils/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface GrammarCardProps {
  item: GrammarType;
}

function GrammarCard({ item }: GrammarCardProps) {
  return (
    <Card className="border-none shadow-[0_2px_12px_rgba(0,0,0,0.03)] rounded-[22px] overflow-hidden bg-white">
      <Accordion type="single" collapsible>
        <AccordionItem value={item.id} className="border-none px-5 py-4">
        
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <Badge
                className="text-[9px] font-black uppercase tracking-widest text-blue-500"
                variant="outline"
              >
                {item.pos}
              </Badge>
              <Badge
                className="text-[9px] font-black uppercase tracking-widest text-blue-500"
                variant="outline"
              >
                {item.level}
              </Badge>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-100"
                >
                  <Maximize2 size={8} className="text-gray-400" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-[28px]">
                <DialogHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="text-blue-500 uppercase text-[10px]">{item.pos}</Badge>
                    <Badge variant="outline" className="text-blue-500 uppercase text-[10px]">{item.level}</Badge>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-[#1d1d1f]">
                    {item.main_category}
                  </DialogTitle>
                  <p className="text-md font-medium text-gray-500">{item.rel_category}</p>
                </DialogHeader>
                
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-blue-50/50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-blue-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Формула</span>
                    </div>
                    <code className="text-base font-mono font-semibold text-blue-700">{item.id}</code>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Пример</span>
                    </div>
                    <p className="text-sm italic text-[#1d1d1f] leading-relaxed">{item.example}</p>
                  </div>
                  <p className="text-sm text-[#86868b] px-1 leading-relaxed">{item.meaning}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <AccordionTrigger className="hover:no-underline pt-0">
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold text-[#1d1d1f] tracking-tight">
                {item.main_category}
              </span>
              <span className="text-md font-semibold text-[#1d1d1fbc] tracking-tight">
                {item.rel_category}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-5">
            <div className="space-y-4 border-t border-gray-50 pt-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 bg-blue-50/50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={12} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Формула
                    </span>
                  </div>
                  <code className="text-sm font-mono font-semibold text-blue-700">
                    {item.id}
                  </code>
                </div>

                <div className="p-3 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen size={12} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      Пример
                    </span>
                  </div>
                  <p className="text-sm italic text-[#1d1d1f]">
                    {item.example}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#86868b] leading-relaxed px-1">
                {item.meaning}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default GrammarCard;