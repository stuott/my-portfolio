import classNames from "classnames";
import Section from "components/layout/Section";
import { useState } from "react";

// type cellUpdate = (row: number, col: number, value: number) => void;
type selectCell = (row: SudokuValue, col: SudokuValue) => void;

// type sudokuData = rowData[];
// type rowData = cellData[];
// type cellData = number | null;
type cell = [SudokuValue, SudokuValue];
type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const Sudoku = () => {
  //   const [sudoku, setSudoku] = useState<sudokuData>([[]]);
  const [selected, setSelected] = useState<cell | undefined>();

  const selectCell = (row: SudokuValue, col: SudokuValue) => {
    if (!selected) {
      setSelected([row, col]); // Set the selected state when no cell is selected initially
      return;
    }
    if (selected[0] === row && selected[1] === col) {
      setSelected(undefined);
    } else {
      setSelected([row, col]);
    }
  };

  //   const updateCell = (row: number, col: number, value: number) => {
  //     const newSudoku = sudoku.map((r, i) =>
  //       r.map((c, j) => (i ==== row && j ==== col ? value : c))
  //     );
  //     setSudoku(newSudoku);
  //   };

  return (
    <Section title="Sudoku" className="bg-zinc-900/30 items-center">
      <div className="grid grid-row-3 bg-zinc-900 p-6 w-fit h-fit">
        <SudokoBoxRow
          boxRowIndex={1}
          selectCell={selectCell}
          selected={selected}
        />
        <SudokoBoxRow
          boxRowIndex={2}
          selectCell={selectCell}
          selected={selected}
        />
        <SudokoBoxRow
          boxRowIndex={3}
          selectCell={selectCell}
          selected={selected}
        />
      </div>
    </Section>
  );
};

interface SudokoRowProps {
  boxRowIndex: 1 | 2 | 3;
  selected?: cell;
  selectCell: selectCell;
}

const SudokoBoxRow = ({
  boxRowIndex,
  selected,
  selectCell,
}: SudokoRowProps) => {
  return (
    <div className="grid grid-cols-3 bg-zinc-900 w-fit h-fit">
      <SukodkuBox
        boxRowIndex={boxRowIndex}
        boxColIndex={1}
        selectCell={selectCell}
        selected={selected}
      />
      <SukodkuBox
        boxRowIndex={boxRowIndex}
        boxColIndex={2}
        selectCell={selectCell}
        selected={selected}
      />
      <SukodkuBox
        boxRowIndex={boxRowIndex}
        boxColIndex={3}
        selectCell={selectCell}
        selected={selected}
      />
    </div>
  );
};

interface SukodkuBoxProps extends SudokoRowProps {
  boxColIndex: 1 | 2 | 3;
}

const SukodkuBox = ({
  boxRowIndex,
  boxColIndex,
  selected,
  selectCell,
}: SukodkuBoxProps) => {
  const boxClasses = classNames(
    "grid grid-cols-3 bg-zinc-900 w-fit h-fit border"
  );

  const boxRowToGrid = (
    boxIndex: 1 | 2 | 3,
    cell: SudokuValue
  ): SudokuValue => {
    if (boxIndex === 1) {
      if (cell === 1 || cell === 2 || cell === 3) {
        return 1;
      } else if (cell === 4 || cell === 5 || cell === 6) {
        return 2;
      } else {
        return 3;
      }
    } else if (boxIndex === 2) {
      if (cell === 1 || cell === 2 || cell === 3) {
        return 4;
      } else if (cell === 4 || cell === 5 || cell === 6) {
        return 5;
      } else {
        return 6;
      }
    } else {
      if (cell === 1 || cell === 2 || cell === 3) {
        return 7;
      } else if (cell === 4 || cell === 5 || cell === 6) {
        return 8;
      } else {
        return 9;
      }
    }
  };

  const boxColToGrid = (
    boxIndex: 1 | 2 | 3,
    cell: SudokuValue
  ): SudokuValue => {
    if (boxIndex === 1) {
      if (cell === 1 || cell === 4 || cell === 7) {
        return 1;
      } else if (cell === 2 || cell === 5 || cell === 8) {
        return 2;
      } else {
        return 3;
      }
    } else if (boxIndex === 2) {
      if (cell === 1 || cell === 4 || cell === 7) {
        return 4;
      } else if (cell === 2 || cell === 5 || cell === 8) {
        return 5;
      } else {
        return 6;
      }
    } else {
      if (cell === 1 || cell === 4 || cell === 7) {
        return 7;
      } else if (cell === 2 || cell === 5 || cell === 8) {
        return 8;
      } else {
        return 9;
      }
    }
  };

  const cells: SudokuValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={boxClasses}>
      {cells.map((cell) => {
        const gridRow = boxRowToGrid(boxRowIndex, cell);
        const gridCol = boxColToGrid(boxColIndex, cell);
        return (
          <SudokuCell
            row={gridRow}
            col={gridCol}
            selected={
              selected && selected[0] === gridRow && selected[1] === gridCol
            }
            selectCell={selectCell}
          />
        );
      })}
    </div>
  );
};

interface SudokuCellProps {
  row: SudokuValue;
  col: SudokuValue;
  value?: SudokuValue;
  selected?: boolean;
  selectCell: selectCell;
}

const SudokuCell = ({
  row,
  col,
  value,
  selected,
  selectCell,
}: SudokuCellProps) => {
  const divClasses = classNames("p-1 border border-gray-700", {
    " bg-cyan-950": selected,
  });
  const cellClasses = classNames("text-center w-10 h-10 text-3xl");

  const handleClick = () => {
    selectCell(row, col);
  };

  return (
    <div className={divClasses}>
      <button className={cellClasses} onClick={handleClick}>
        {/* {value ?? ""} */}
        {row},{col}
      </button>
    </div>
  );
};

export default Sudoku;
