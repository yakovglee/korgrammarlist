import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";
import ContentMax from "../ContentMax";
import type { GrammarType } from "@/utils/types";

interface ContentMaxProps {
  item: GrammarType;
}

function GrammarDialog({ item }: ContentMaxProps) {
  return (
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
          <DialogTitle className="text-2xl font-bold text-[#1d1d1f]">
            {item.main_category}
          </DialogTitle>
          <p className="text-md font-medium text-gray-500">
            {item.rel_category}
          </p>
        </DialogHeader>

        <ContentMax item={item} />
      </DialogContent>
    </Dialog>
  );
}

export default GrammarDialog;
