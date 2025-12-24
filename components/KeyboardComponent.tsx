import { motion } from "framer-motion";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

type KeyboardComponentProps = {
  onKeyPress: (key: string) => void;
};

const KeyboardComponent = ({ onKeyPress }: KeyboardComponentProps) => {
  return (
    <div className="mt-6 flex flex-col gap-2 select-none">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((letter, letterIndex) => (
            <motion.button
              key={letterIndex}
              onClick={() => onKeyPress(letter)}
              className={`px-3 py-4 font-semibold uppercase text-sm rounded bg-gray-200 gap gap-4 hover:bg-gray-400 cursor-pointer  ${
                letter === "enter" || letter === "backspace"
                  ? "px-4 bg-yellow-200 hover:bg-yellow-400"
                  : "w-10"
              }`}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              {letter === "backspace" ? "⌫" : letter}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyboardComponent;
