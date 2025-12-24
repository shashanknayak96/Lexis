import { useEffect, useState } from "react";
import { CheckGuess } from "../utils/CheckGuess";
import type { Letter } from "../models/Letter";
import { GameState } from "../enums/GameState";
import { GetWordByDate } from "../utils/RandomWord";
import KeyboardComponent from "../components/KeyboardComponent";
import { CheckWord } from "../utils/CheckWord";

import GridComponent from "../components/GridComponent";
import "./App.css";

function App() {
  const [solution, setSolution] = useState(GetWordByDate());
  const [guesses, setGuesses] = useState<Letter[][]>([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [shakeRow, setShakeRow] = useState<number | null>(null);

  useEffect(() => {
    GetWordByDate();
    const handleKeyDownPhysical = (e: { key: string }) => {
      handleKeyDown(e.key.toLowerCase());
    };
    window.addEventListener("keydown", handleKeyDownPhysical);

    return () => window.removeEventListener("keydown", handleKeyDownPhysical);
  }, [currentGuess, gameState, currentRow, guesses]);

  useEffect(() => {
    if (shakeRow !== null) {
      const t = setTimeout(() => setShakeRow(null), 400);

      return () => clearTimeout(t);
    }
  }, [shakeRow]);

  const handleKeyDown = (key: string) => {
    if (gameState !== "playing") return;

    // Letters
    if (/^[a-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }

    // Backspace
    if (key === "backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }

    // Enter
    if (key === "enter") {
      // Check if word is 5 length and correct
      if (currentGuess.length === 5 && currentRow <= 6) {
        // Check correct word
        const isCorrectWord = CheckWord(currentGuess);
        if (!isCorrectWord) {
          setShakeRow(currentRow);
          return;
        }

        const result = CheckGuess(currentGuess, solution);

        setGuesses((prev) => [...prev, result]);

        if (currentGuess === solution) {
          setGameState(GameState.Won);
          setCurrentGuess("");
          return;
        }

        if (currentRow === 5) {
          setGameState(GameState.Lost);
          setCurrentGuess("");
          return;
        }

        setCurrentGuess("");
        setCurrentRow((prev) => prev + 1);
      } else {
        console.log("INCORRECT GUESS");
      }
    }
  };

  const resetGame = () => {
    setCurrentGuess("");
    setGuesses([]);
    setCurrentRow(0);
    setGameState(GameState.Playing);
    setSolution(GetWordByDate());
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* App Container */}
      {gameState !== "playing" && (
        <div className="bg-red-200 px-10 py-10 rounded-xl absolute text-lg font-semibold z-10">
          {gameState === "won"
            ? "🎉 You Win!"
            : `😢 You Lose! Word was ${solution.toUpperCase()}`}
        </div>
      )}
      <button
        onClick={resetGame}
        className="mt-2 mb-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
      >
        Restart
      </button>
      <div className="w-full max-w-md px-4">
        {/* Board Wrapper */}
        <div className="flex flex-col items-center gap-6">
          {/* Grid */}
          <GridComponent
            guesses={guesses}
            currentRow={currentRow}
            currentGuess={currentGuess}
						shakeRow={shakeRow}
          ></GridComponent>
        </div>
      </div>
      <KeyboardComponent onKeyPress={handleKeyDown}></KeyboardComponent>
    </div>
  );
}

export default App;
