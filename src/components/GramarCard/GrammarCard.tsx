import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Card } from "@/components//ui/card";
import { Badge } from "@/components//ui/badge";

import ContentMini from "./ContentMini";

import type { GrammarType } from "@/utils/types";

import GrammarDialog from "./features/GrammarDialog";

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

            <GrammarDialog item={item} />
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
            <ContentMini example={item.example} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default GrammarCard;
