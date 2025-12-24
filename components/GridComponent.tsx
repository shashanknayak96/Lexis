import type { Letter } from "../models/Letter";
import { RowComponent } from "./RowComponent";

type GridProps = {
  guesses: Letter[][];
  currentGuess: string;
  currentRow: number;
  shakeRow: number | null;
};

const GridComponent = ({
  guesses,
  currentRow,
  currentGuess,
  shakeRow,
}: GridProps) => {
  return (
    <div className="grid grid-rows-6 gap-2">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const guess = guesses[rowIndex];
        const isCurrentRow = currentRow === rowIndex;

        return (
          <RowComponent
            key={rowIndex}
            guess={guess}
            isCurrentRow={isCurrentRow}
            currentGuess={currentGuess}
            shake={shakeRow === rowIndex}
          ></RowComponent>
        );
      })}
    </div>
  );
};

export default GridComponent;
