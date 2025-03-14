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
        classes.push("border-t-[3px]", "border-t-red-700");
      } else {
        classes.push("pt-[3px]");
      }

      if (cell.selectedBorders.bottom) {
        classes.push("border-b-[3px]", "border-b-red-700");
      } else {
        classes.push("pb-[3px]");
      }

      if (cell.selectedBorders.left) {
        classes.push("border-l-[3px]", "border-l-red-700");
      } else {
        classes.push("pl-[3px]");
      }

      if (cell.selectedBorders.right) {
        classes.push("border-r-[3px]", "border-r-red-700");
      } else {
        classes.push("pr-[3px]");
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
      "flex gap-[0.5] pointer-events-none",
      "text-sm font-bold text-zinc-300",
      "absolute top-0 left-0",
      "w-full h-full md:h-12 md:w-12 z-10",
      "flex-wrap text-center",
      getSelectedBorderClasses(),
      {
        "bg-red-900/10": cell.isSelected || cell.isHighlighted,
      }
    );

    const getGuessChildren = () => {
      if (cell.guesses.length === 0 || cell.value !== null) {
        return null;
      }
      return (
        <div className="relative w-full h-full">
          {cell.guesses.includes(1) && (
            <div className="absolute -top-[2px] left-[2px]">1</div>
          )}
          {cell.guesses.includes(2) && (
            <div className="absolute -top-[2px] inset-x-[2px]">2</div>
          )}
          {cell.guesses.includes(3) && (
            <div className="absolute -top-[2px] right-[2px]">3</div>
          )}
          {cell.guesses.includes(4) && (
            <div className="absolute inset-y-[10px] left-[2px]">4</div>
          )}
          {cell.guesses.includes(5) && (
            <div className="absolute inset-y-[10px] inset-x-0">5</div>
          )}
          {cell.guesses.includes(6) && (
            <div className="absolute inset-y-[10px] right-[2px]">6</div>
          )}
          {cell.guesses.includes(7) && (
            <div className="absolute -bottom-[2px] left-[2px]">7</div>
          )}
          {cell.guesses.includes(8) && (
            <div className="absolute -bottom-[2px] inset-x-[2px]">8</div>
          )}
          {cell.guesses.includes(9) && (
            <div className="absolute -bottom-[2px] right-[2px]">9</div>
          )}
        </div>
      );
    };

    return (
      <div
        className={divClasses}
        onMouseDown={() => onMouseDown(cell.row, cell.col)}
        onMouseEnter={() => onMouseEnter(cell.row, cell.col)}
      >
        <button className={cellClasses}>{cell.value ?? ""}</button>
        <div className={overlayClasses}>{getGuessChildren()}</div>
      </div>
    );
  }
);

export default SudokuCell;
