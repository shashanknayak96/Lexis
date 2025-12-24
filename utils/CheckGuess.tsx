import { GuessStatus } from "../enums/GuessStatus";
import type { GuessResult } from "../models/GuessResult";

export const CheckGuess = (guess: string, solution: string): GuessResult[] => {
  const result: GuessResult[] = [];
  const solutionLetters = solution.split("");
  console.log(solutionLetters);

  // split guess and foreach over it
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      result[i] = { letter: guess[i], status: GuessStatus.Correct };
      solutionLetters[i] = "";
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i]) continue;
    // word is incorrect or incorrect place check
    const letterIndex = solutionLetters.findIndex((x) => x === guess[i]);
    if (letterIndex >= 0) {
      result[i] = { letter: guess[i], status: GuessStatus.Present };
      solutionLetters[letterIndex] = "";
    } else {
      result[i] = { letter: guess[i], status: GuessStatus.Absent };
    }
  }

  return result;
};
