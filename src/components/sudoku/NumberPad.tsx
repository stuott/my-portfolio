import classNames from "classnames";
import { SudokuValue } from "./sudokuUtilts";

interface NumberPadProps {
  onClick: (value: SudokuValue) => void;
  solvedDigits: SudokuValue[];
}

const NumberPad = ({ onClick, solvedDigits }: NumberPadProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-white p-4 bg-zinc-900">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => {
        const disabled = solvedDigits.includes(num as SudokuValue);
        const btnClasses = classNames("text-2xl px-4 py-3", {
          " bg-zinc-800 hover:bg-zinc-400": disabled,
          " bg-cyan-900 hover:bg-cyan-700": !disabled,
        });

        return (
          <button
            className={btnClasses}
            key={num}
            onClick={() => onClick(num as SudokuValue)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default NumberPad;
