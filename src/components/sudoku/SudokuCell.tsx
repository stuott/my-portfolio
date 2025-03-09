import classNames from "classnames";
import { SudokuValue } from "./sudokuUtils";

interface SudokuCellProps {
  row: number;
  col: number;
  value?: SudokuValue;
  selected?: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  isStatic?: boolean;
  highlight?: string;
}

const SudokuCell = ({
  row,
  col,
  value,
  selected,
  onMouseDown,
  onMouseEnter,
  isStatic,
  highlight,
}: SudokuCellProps) => {
  const divClasses =
    classNames("border h-10 w-10 md:h-12 md:w-12", {
      "bg-red-900/15 border-3 border-red-700": selected,
      "border-zinc-700": !selected,
      "font-bold": isStatic,
    }) +
    (" " + highlight);

  const cellClasses = classNames("text-center h-full w-full text-3xl");

  return (
    <div
      className={divClasses}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
    >
      <button className={cellClasses}>{value ?? ""}</button>
    </div>
  );
};

export default SudokuCell;
