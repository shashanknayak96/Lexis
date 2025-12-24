import { WORDS } from "./words";

export const CheckWord = (word: string) => {
  const words = new Set(WORDS);
  return words.has(word);
};
