import { faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Section from "components/layout/Section";
import data from "data/sudoku.json";
import { useCallback, useEffect, useState } from "react";

type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type cell = [SudokuValue, SudokuValue];
type selectCell = (row: SudokuValue, col: SudokuValue) => void;
type cellData = SudokuValue | null;
type rowData = cellData[];
type sudokuData = rowData[];

enum SudokuActions {
  NONE = 0,
  SELECT = 1,
  DESELECT = 2,
}

const cellDisabled = (row: SudokuValue, col: SudokuValue) => {
  return data.puzzle.mask[row - 1][col - 1];
};

const getDisabledDigits = (sudoku: sudokuData): SudokuValue[] => {
  const digitCount: Record<SudokuValue, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  sudoku.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== null) {
        digitCount[cell]++;
      }
    });
  });

  return Object.keys(digitCount)
    .filter((digit) => digitCount[parseInt(digit) as SudokuValue] >= 9)
    .map((digit) => parseInt(digit) as SudokuValue);
};

const Sudoku = () => {
  const [sudoku, setSudoku] = useState<sudokuData>(
    data.puzzle.values as sudokuData
  );
  const [selected, setSelected] = useState<cell[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentAction, setCurrentAction] = useState<SudokuActions>(0);
  const [solvedDigits, setSolvedDigits] = useState<SudokuValue[]>([]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.shiftKey) {
      setIsMultiSelect(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.shiftKey) {
      setIsMultiSelect(false);
    }
  };

  const updateCell = useCallback(
    (value: SudokuValue) => {
      if (selected.length === 0) return;
      const newSudoku = sudoku.map((r, i) =>
        r.map((c, j) => {
          const isSelected = selected.some(
            ([row, col]) => row - 1 === i && col - 1 === j
          );
          if (
            isSelected &&
            !cellDisabled((i + 1) as SudokuValue, (j + 1) as SudokuValue)
          ) {
            return c === value ? null : value;
          }
          return c;
        })
      );
      setSudoku(newSudoku);
    },
    [selected, sudoku]
  );

  const clearSelectedCells = useCallback(() => {
    if (selected.length === 0) return;
    const newSudoku = sudoku.map((r, i) =>
      r.map((c, j) => {
        const isSelected = selected.some(
          ([row, col]) => row - 1 === i && col - 1 === j
        );
        if (
          isSelected &&
          !cellDisabled((i + 1) as SudokuValue, (j + 1) as SudokuValue)
        ) {
          return null;
        }
        return c;
      })
    );
    setSudoku(newSudoku);
  }, [selected, sudoku]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const value = parseInt(event.key, 10);
      if (value >= 1 && value <= 9) {
        updateCell(value as SudokuValue);
      } else if (event.key === "Backspace") {
        clearSelectedCells();
      }
    },
    [updateCell, clearSelectedCells]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keypress", handleKeyPress);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] === data.puzzle.solution[i][j]) {
          setSolvedDigits((prev) => [...prev, sudoku[i][j] as SudokuValue]);
        }
      }
    }

    setSolvedDigits(getDisabledDigits(sudoku));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [sudoku, handleKeyPress]);

  const selectCell = (
    row: SudokuValue,
    col: SudokuValue,
    isDragging = false
  ) => {
    const cellIndex = selected.findIndex(([r, c]) => r === row && c === col);
    if (isMultiSelect || isDragging) {
      if (cellIndex === -1) {
        if (currentAction === SudokuActions.DESELECT) {
          return;
        }
        setSelected([...selected, [row, col]]);
      } else if (isDragging) {
        if (currentAction === SudokuActions.SELECT) {
          return;
        }
        setSelected(selected.filter((_, index) => index !== cellIndex));
      }
    } else {
      if (cellIndex === -1) {
        setSelected([[row, col]]);
      } else {
        setSelected([]);
      }
    }
  };

  const handleMouseDown = (row: SudokuValue, col: SudokuValue) => {
    const cellindex = selected.findIndex(([r, c]) => r === row && c === col);
    if (cellindex !== -1) {
      setCurrentAction(SudokuActions.DESELECT);
    } else {
      setCurrentAction(SudokuActions.SELECT);
    }
    selectCell(row, col);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setCurrentAction(SudokuActions.NONE);
    setIsDragging(false);
  };

  const handleMouseEnter = (row: SudokuValue, col: SudokuValue) => {
    if (isDragging) {
      selectCell(row, col, true);
    }
  };

  const checkSolution = () => {
    const isCorrect = sudoku.every((row, rowIndex) =>
      row.every(
        (cell, colIndex) => cell === data.puzzle.solution[rowIndex][colIndex]
      )
    );
    if (isCorrect) {
      alert("Congratulations! The solution is correct.");
    } else {
      alert("The solution is incorrect. Please try again.");
    }
  };

  return (
    <Section title="Sudoku" className="bg-zinc-900/30 items-center">
      <div
        className="grid grid-row-3 bg-zinc-900 p-6 w-fit h-fit"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <SudokoBoxRow
            key={i}
            data={sudoku}
            boxRowIndex={(i + 1) as 1 | 2 | 3}
            selectCell={selectCell}
            selected={selected}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
          />
        ))}
      </div>
      <div className="flex gap-8 items-center">
        <button
          className="bg-red-900 text-2xl p-3 hover:bg-red-800"
          onClick={() => setSudoku(data.puzzle.values as sudokuData)}
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </button>
        <NumberPad
          onClick={(value: SudokuValue) => updateCell(value)}
          solvedDigits={solvedDigits}
        />
        <button
          className="bg-green-900 text-2xl p-3 hover:bg-green-800"
          onClick={checkSolution}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    </Section>
  );
};

const NumberPad = ({
  onClick,
  solvedDigits,
}: {
  onClick: (value: SudokuValue) => void;
  solvedDigits: SudokuValue[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-white">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => {
        const disabled = solvedDigits.includes(num as SudokuValue);
        const btnClasses = classNames("text-2xl px-4 py-3", {
          " bg-zinc-800 hover:bg-zinc-400": disabled,
          " bg-cyan-900 hover:bg-cyan-700": !disabled,
        });

        return (
          <button
            className={btnClasses}
            key={num}
            onClick={() => onClick(num as SudokuValue)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

interface SudokoRowProps {
  data: sudokuData;
  boxRowIndex: 1 | 2 | 3;
  selected?: cell[];
  selectCell: selectCell;
  onMouseDown: (row: SudokuValue, col: SudokuValue) => void;
  onMouseEnter: (row: SudokuValue, col: SudokuValue) => void;
}

const SudokoBoxRow = ({
  data,
  boxRowIndex,
  selected,
  selectCell,
  onMouseDown,
  onMouseEnter,
}: SudokoRowProps) => {
  return (
    <div className="grid grid-cols-3 bg-zinc-900 w-fit h-fit">
      {Array.from({ length: 3 }, (_, i) => (
        <SukodkuBox
          key={i}
          data={data}
          boxRowIndex={boxRowIndex}
          boxColIndex={(i + 1) as 1 | 2 | 3}
          selectCell={selectCell}
          selected={selected}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
        />
      ))}
    </div>
  );
};

interface SukodkuBoxProps extends SudokoRowProps {
  boxColIndex: 1 | 2 | 3;
}

const boxToGrid = (
  boxIndex: 1 | 2 | 3,
  cell: SudokuValue,
  isRow: boolean
): SudokuValue => {
  const base = (boxIndex - 1) * 3;
  const offset = isRow ? Math.floor((cell - 1) / 3) : (cell - 1) % 3;
  return (base + 1 + offset) as SudokuValue;
};

const SukodkuBox = ({
  data,
  boxRowIndex,
  boxColIndex,
  selected,
  onMouseDown,
  onMouseEnter,
}: SukodkuBoxProps) => {
  const boxClasses = classNames(
    "grid grid-cols-3 bg-zinc-900 w-fit h-fit border"
  );

  const cells: SudokuValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={boxClasses}>
      {cells.map((cell) => {
        const gridRow = boxToGrid(boxRowIndex, cell, true);
        const gridCol = boxToGrid(boxColIndex, cell, false);
        return (
          <SudokuCell
            key={`${gridRow}-${gridCol}`}
            value={(data[gridRow - 1][gridCol - 1] as SudokuValue) ?? undefined}
            row={gridRow}
            col={gridCol}
            selected={
              selected &&
              selected.some(([r, c]) => r === gridRow && c === gridCol)
            }
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
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
  onMouseDown: (row: SudokuValue, col: SudokuValue) => void;
  onMouseEnter: (row: SudokuValue, col: SudokuValue) => void;
}

const SudokuCell = ({
  row,
  col,
  value,
  selected,
  onMouseDown,
  onMouseEnter,
}: SudokuCellProps) => {
  const divClasses = classNames("border border-gray-700", {
    " bg-cyan-900": selected,
    " font-bold": cellDisabled(row, col),
  });
  const cellClasses = classNames("text-center w-12 h-12 text-3xl");

  return (
    <div
      className={divClasses}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
    >
      <button className={cellClasses} disabled={cellDisabled(row, col)}>
        {value ?? ""}
      </button>
    </div>
  );
};

export default Sudoku;
