import classNames from "classnames";
import { SudokuCellData } from "types/sudoku";

interface SudokuCellProps {
  cell: SudokuCellData;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
}

const SudokuCell = ({ cell, onMouseDown, onMouseEnter }: SudokuCellProps) => {
  const getCellBackground = () => {
    if (cell.isError) {
      return "bg-red-700";
    }
    if (cell.isHighlighted) {
      return "bg-red-900/15";
    }
    if (cell.isSelected) {
      return "bg-red-900/15";
    }
  };

  const divClasses = classNames(
    "border h-10 w-10 md:h-12 md:w-12",
    getCellBackground(),
    {
      "border-2 border-red-700": cell.isSelected,
      "border-zinc-700": !cell.isSelected,
      "font-bold": cell.isStatic,
    }
  );

  const cellClasses = classNames("text-center h-full w-full text-3xl");

  return (
    <div
      className={divClasses}
      onMouseDown={() => onMouseDown(cell.row, cell.col)}
      onMouseEnter={() => onMouseEnter(cell.row, cell.col)}
    >
      <button className={cellClasses}>{cell.value ?? ""}</button>
    </div>
  );
};

export default SudokuCell;
