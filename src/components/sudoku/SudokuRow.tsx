import SudokuCell from "./SudokuCell";
import { CellPosition, isCellStatic, SudokuValue } from "./sudokuUtilts";

interface SudokuRowProps {
  row: (SudokuValue | null)[];
  rowIndex: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  disabled: boolean;
  duplicateFlags: boolean[];
  isSameValueFlags: boolean[];
  puzzle: number;
  selectedCells: CellPosition[];
}

const SudokuRow = ({
  row,
  rowIndex,
  selectedCells,
  onMouseDown,
  onMouseEnter,
  puzzle,
  duplicateFlags,
  isSameValueFlags,
}: SudokuRowProps) => {
  const getCellHighlight = (col: number) => {
    if (duplicateFlags[col]) {
      return "bg-red-900/50";
    }

    if (selectedCells.length === 0 || selectedCells.length > 1) {
      return "";
    }

    const [selectedRow, selectedCol] = selectedCells[0];
    if (selectedRow === rowIndex && selectedCol === col) {
      return "";
    }

    if (isSameValueFlags[col] && row[col] !== null) {
      return "bg-yellow-900/50";
    }

    const isSameRowOrCol = selectedRow === rowIndex || selectedCol === col;
    const isSameBox =
      Math.floor(selectedRow / 3) === Math.floor(rowIndex / 3) &&
      Math.floor(selectedCol / 3) === Math.floor(col / 3);
    if (isSameRowOrCol || isSameBox) {
      return "bg-cyan-900/50";
    }

    return "";
  };

  return (
    <div className="flex">
      {row.map((value, colIndex) => (
        <SudokuCell
          row={rowIndex as SudokuValue}
          col={colIndex as SudokuValue}
          value={value as SudokuValue}
          selected={selectedCells.some(
            (cell) => cell[0] === rowIndex && cell[1] === colIndex
          )}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          isStatic={isCellStatic(
            rowIndex as SudokuValue,
            colIndex as SudokuValue,
            puzzle
          )}
          highlight={getCellHighlight(colIndex)}
        />
      ))}
    </div>
  );
};

export default SudokuRow;
