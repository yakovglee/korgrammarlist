import type { GrammarType } from "./types";

export const grammarData: GrammarType[] = [
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
  {
    id: "fut-s",
    category: "Tenses",
    title: "Future Simple",
    formula: "Will + V1",
    usage: "Спонтанные решения.",
    example: "I will call you back.",
  },
];
