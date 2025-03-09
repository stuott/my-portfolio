import classNames from "classnames";
import { memo } from "react";
import { SudokuCellData } from "types/sudoku";

interface SudokuCellProps {
  cell: SudokuCellData;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
}

const SudokuCell = memo(
  ({ cell, onMouseDown, onMouseEnter }: SudokuCellProps) => {
    const getCellBackground = () => {
      if (cell.isError) {
        return "bg-red-600/30";
      }
      if (cell.isHighlighted) {
        return "bg-red-900/10";
      }
      if (cell.isSelected) {
        return "bg-red-900/15";
      }
      if (cell.isSelectedValue) {
        return "bg-yellow-400/30";
      }
      if (cell.isStatic) {
        return "bg-zinc-700/20";
      }
    };

    const getSelectedBorderClasses = () => {
      const classes = [];
      if (cell.selectedBorders.top) {
        classes.push("border-t-3 border-t-red-700");
      }
      if (cell.selectedBorders.bottom) {
        classes.push("border-b-3 border-b-red-700");
      }
      if (cell.selectedBorders.left) {
        classes.push("border-l-3 border-l-red-700");
      }
      if (cell.selectedBorders.right) {
        classes.push("border-r-3 border-r-red-700");
      }
      return classes.join(" ");
    };

    const getGridBorders = () => {
      const classes = [];
      if (cell.boxPosition == 2 || cell.boxPosition == 8) {
        classes.push("border-x-2 border-x-zinc-800");
      }
      if (cell.boxPosition == 4 || cell.boxPosition == 6) {
        classes.push("border-y-2 border-y-zinc-800");
      }
      if (cell.boxPosition == 5) {
        classes.push("border-2 border-zinc-800");
      }
      return classes.join(" ");
    };

    const divClasses = classNames(
      "relative h-10 w-10 md:h-12 md:w-12",
      getCellBackground(),
      {
        "text-zinc-300 ": cell.isStatic,
        "font-bold": !cell.isStatic,
      }
    );

    const cellClasses = classNames(
      "text-center h-full w-full text-3xl",
      getGridBorders()
    );

    const overlayClasses = classNames(
      "pointer-events-none text-center",
      "absolute top-0",
      "w-full h-full md:h-12 md:w-12 z-10",
      getSelectedBorderClasses()
    );

    const guess = cell.value ? "" : cell.guess ?? "";

    return (
      <div
        className={divClasses}
        onMouseDown={() => onMouseDown(cell.row, cell.col)}
        onMouseEnter={() => onMouseEnter(cell.row, cell.col)}
      >
        <button className={cellClasses}>{cell.value ?? ""}</button>
        <div className={overlayClasses}>{guess}</div>
      </div>
    );
  }
);

export default SudokuCell;
