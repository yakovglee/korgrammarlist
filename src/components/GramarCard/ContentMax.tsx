import type { GrammarType } from "@/utils/types";
import { Sparkles, BookOpen } from "lucide-react";

interface ContentMaxProps {
  item: GrammarType;
}

function ContentMax({ item }: ContentMaxProps) {
  return (
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
            {item.usage}
          </code>
        </div>

        <div className="p-3 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={12} className="text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Пример
            </span>
          </div>
          <p className="text-sm italic text-[#1d1d1f]">{item.example}</p>
        </div>
      </div>
      <p className="text-xs text-[#86868b] leading-relaxed px-1">
        {item.meaning}
      </p>
    </div>
  );
}

export default ContentMax;
