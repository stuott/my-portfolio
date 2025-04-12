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
      "flex-wrap text-center"
    );

    const highlightClasses = classNames(
      "flex gap-[0.5] pointer-events-none",
      "absolute top-0 left-0 w-full h-full",
      "transition-all duration-200",
      {
        "bg-red-900/10": cell.isSelected || cell.isHighlighted,
      }
    );

    const getGuessChildren = () => {
      if (cell.guesses.length === 0 || cell.value !== null) {
        return null;
      }

      const topClass = " top-[1px]";
      const middleClass = " inset-y-[15px]";
      const bottomClass = " bottom-0";
      const leftClass = " left-[6px]";
      const centerClass = " inset-x-0";
      const rightClass = " right-[6px]";

      return (
        <div className="relative w-full h-full">
          {cell.guesses.includes(1) && (
            <div className={"absolute" + topClass + leftClass}>1</div>
          )}
          {cell.guesses.includes(2) && (
            <div className={"absolute" + topClass + centerClass}>2</div>
          )}
          {cell.guesses.includes(3) && (
            <div className={"absolute" + topClass + rightClass}>3</div>
          )}
          {cell.guesses.includes(4) && (
            <div className={"absolute" + middleClass + leftClass}>4</div>
          )}
          {cell.guesses.includes(5) && (
            <div className={"absolute" + middleClass + centerClass}>5</div>
          )}
          {cell.guesses.includes(6) && (
            <div className={"absolute" + middleClass + rightClass}>6</div>
          )}
          {cell.guesses.includes(7) && (
            <div className={"absolute" + bottomClass + leftClass}>7</div>
          )}
          {cell.guesses.includes(8) && (
            <div className={"absolute" + bottomClass + centerClass}>8</div>
          )}
          {cell.guesses.includes(9) && (
            <div className={"absolute" + bottomClass + rightClass}>9</div>
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
        <div className={overlayClasses + " " + getSelectedBorderClasses()} />
        <div className={highlightClasses} />
        <div className={overlayClasses}>{getGuessChildren()}</div>
      </div>
    );
  }
);

export default SudokuCell;
