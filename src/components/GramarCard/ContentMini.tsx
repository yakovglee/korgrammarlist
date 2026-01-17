import { BookOpen } from "lucide-react";

interface ContentMiniProps {
  example: string;
}

function ContentMini({ example }: ContentMiniProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-2xl">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen size={12} className="text-gray-400" />
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          Пример
        </span>
      </div>
      <p className="text-sm italic text-[#1d1d1f]">{example}</p>
    </div>
  );
}

export default ContentMini;
