import { GuessStatus } from "../enums/GuessStatus";
import type { Letter } from "../models/Letter";
import TileComponent from "./TileComponent";
import { motion } from "framer-motion";

type RowProps = {
  guess?: Letter[];
  isCurrentRow: boolean;
  currentGuess: string;
  shake: boolean;
};

export const RowComponent = ({
  guess,
  isCurrentRow,
  currentGuess,
  shake,
}: RowProps) => {
  return (
    <motion.div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 5 }).map((_, colIndex) => {
        let letter = "";
        let status = GuessStatus.New;

        if (guess) {
          // guessed past word
          letter = guess[colIndex].letter;
          status = guess[colIndex].status;
        } else if (isCurrentRow) {
          letter = currentGuess[colIndex] || "";
        }

        return (
          <motion.div
            animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TileComponent
              key={colIndex}
              letter={letter}
              status={status}
            ></TileComponent>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
