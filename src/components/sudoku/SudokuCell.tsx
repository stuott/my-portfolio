import classNames from "classnames";
import { SudokuValue } from "./sudokuUtilts";

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
    classNames("border border-gray-700 h-10 w-10 md:h-12 md:w-12", {
      " bg-cyan-900": selected,
      " font-bold": isStatic,
      " border-t-gray-100": row === 0,
      " border-l-gray-100": col === 0,
      " border-r-gray-100 ": col === 2 || col === 5 || col === 8,
      " border-b-gray-100": row === 2 || row === 5 || row === 8,
    }) +
    " " +
    highlight;

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
