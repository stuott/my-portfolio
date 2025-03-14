import classNames from "classnames";
import { SudokuValue } from "types/sudoku";
import { useSudoku } from "./SudokuProvider";

interface NumberPadProps {}

const NumberPad = ({}: NumberPadProps) => {
  const { sudoku, updateSelectedCells } = useSudoku();

  return (
    <div className="grid grid-cols-3 gap-2 text-white p-4 bg-zinc-900">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => {
        const disabled = sudoku.checkDigitSolved(num);
        const btnClasses = classNames(
          "text-2xl px-4 py-3",
          "bg-red-900 hover:bg-red-700",
          {
            " bg-zinc-800 hover:bg-zinc-400": disabled,
            " bg-red-900 hover:bg-red-700": !disabled,
          }
        );

        return (
          <button
            className={btnClasses}
            key={num}
            onClick={() => updateSelectedCells(num as SudokuValue)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default NumberPad;
