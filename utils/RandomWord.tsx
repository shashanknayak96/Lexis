import { WORDS } from "./words";

export function GetWordByDate() {
  let date = new Date().toISOString().split("T")[0];
  date = date.replaceAll("-", "");
  const seed = Number(date) % WORDS.length;
  const word = WORDS[seed];

  return word;
}
