import { SudokuCellData } from "types/sudoku";
import SudokuCell from "./SudokuCell";

interface SudokuRowProps {
  row: SudokuCellData[];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
}

const SudokuRow = ({ row, onMouseDown, onMouseEnter }: SudokuRowProps) => {
  return (
    <div className="flex">
      {row.map((cell, index) => (
        <>
          <SudokuCell
            key={"sudokuCell_" + cell.row + "-" + cell.col}
            cell={cell}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
          />
          {(index === 2 || index === 5) && (
            <div
              key={"divider_" + row + "-" + index}
              className="bg-zinc-300 w-1"
            />
          )}
        </>
      ))}
    </div>
  );
};

export default SudokuRow;
