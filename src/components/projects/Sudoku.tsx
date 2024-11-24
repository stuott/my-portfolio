import { faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import IconButton from "components/common/IconButton";
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

const cellDisabled = (row: SudokuValue, col: SudokuValue, puzzle: number) => {
  return data.puzzles[puzzle].mask[row - 1][col - 1];
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

const checkForDuplicates = (sudoku: sudokuData): boolean[][] => {
  const duplicateFlags: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(false)
  );

  for (let i = 0; i < 9; i++) {
    const row = sudoku[i];
    const col = sudoku.map((row) => row[i]);

    row.forEach((value, j) => {
      if (value !== null && row.indexOf(value) !== j) {
        duplicateFlags[i][j] = true;
        duplicateFlags[i][row.indexOf(value)] = true;
      }
    });

    col.forEach((value, j) => {
      if (value !== null && col.indexOf(value) !== j) {
        duplicateFlags[j][i] = true;
        duplicateFlags[col.indexOf(value)][i] = true;
      }
    });
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxValues: { [key in SudokuValue]?: [number, number] } = {};
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const rowIndex = boxRow * 3 + i;
          const colIndex = boxCol * 3 + j;
          const value = sudoku[rowIndex][colIndex];
          if (value !== null) {
            if (boxValues[value]) {
              duplicateFlags[rowIndex][colIndex] = true;
              const [dupRow, dupCol] = boxValues[value] as [number, number];
              duplicateFlags[dupRow][dupCol] = true;
            } else {
              boxValues[value] = [rowIndex, colIndex];
            }
          }
        }
      }
    }
  }

  return duplicateFlags;
};

const Sudoku = () => {
  const [difficulty, setDifficulty] = useState(0);
  const [sudoku, setSudoku] = useState<sudokuData>(
    data.puzzles[difficulty].values as sudokuData
  );
  const [selected, setSelected] = useState<cell[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentAction, setCurrentAction] = useState<SudokuActions>(0);
  const [solvedDigits, setSolvedDigits] = useState<SudokuValue[]>([]);
  const [duplicateFlags, setDuplicateFlags] = useState<boolean[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
  const [solved, setSolved] = useState<boolean | undefined>(undefined);

  const updateCells = useCallback(
    (value?: SudokuValue) => {
      if (selected.length === 0) return;
      const newSudoku = sudoku.map((r, i) =>
        r.map((c, j) => {
          const isSelected = selected.some(
            ([row, col]) => row - 1 === i && col - 1 === j
          );
          if (
            isSelected &&
            !cellDisabled(
              (i + 1) as SudokuValue,
              (j + 1) as SudokuValue,
              difficulty
            )
          ) {
            return value !== undefined ? (c === value ? null : value) : null;
          }
          return c;
        })
      );
      setDuplicateFlags(checkForDuplicates(newSudoku));
      setSudoku(newSudoku);
    },
    [selected, sudoku, difficulty]
  );

  const handleKeyChange = useCallback(
    (event: KeyboardEvent, keyUp: boolean = false) => {
      const keyActions = [
        {
          keys: ["Escape"],
          action: () => {
            if (!keyUp) {
              setSelected([]);
            }
          },
        },
        {
          keys: ["Delete", "Backspace"],
          action: () => {
            if (!keyUp) {
              updateCells();
            }
          },
        },
        {
          keys: ["Ctrl", "Shift"],
          action: () => setIsMultiSelect(!keyUp),
        },
        {
          keys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          action: () => {
            if (keyUp) return;
            const value = parseInt(event.key, 10);
            if (value >= 1 && value <= 9) {
              updateCells(value as SudokuValue);
            }
          },
        },
        {
          keys: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
          action: () => {
            if (!keyUp) {
              event.preventDefault(); // Prevent default scrolling behavior
              const [row, col] = selected[selected.length - 1];
              let newRow = row;
              let newCol = col;
              switch (event.key) {
                case "ArrowUp":
                  newRow = row === 1 ? 9 : ((row - 1) as SudokuValue);
                  break;
                case "ArrowDown":
                  newRow = row === 9 ? 1 : ((row + 1) as SudokuValue);
                  break;
                case "ArrowLeft":
                  newCol = col === 1 ? 9 : ((col - 1) as SudokuValue);
                  break;
                case "ArrowRight":
                  newCol = col === 9 ? 1 : ((col + 1) as SudokuValue);
                  break;
              }
              if (isMultiSelect) {
                setSelected((prevSelected) => [
                  ...prevSelected,
                  [newRow, newCol],
                ]);
              } else {
                setSelected([[newRow, newCol]]);
              }
            }
          },
        },
      ];

      if (keyActions.some((action) => action.keys.includes(event.key))) {
        keyActions.find((action) => action.keys.includes(event.key))?.action();
      }
    },
    [updateCells, selected, isMultiSelect]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyChange(event);
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      handleKeyChange(event, true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    setSolvedDigits(getDisabledDigits(sudoku));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [sudoku, handleKeyChange]);

  useEffect(() => {
    setSolvedDigits(getDisabledDigits(sudoku));
  }, [setSolvedDigits, sudoku]);

  useEffect(() => {
    setSudoku(data.puzzles[difficulty].values as sudokuData);
  }, [difficulty]);

  const getSelectedCellValue = (): SudokuValue | null => {
    if (selected.length !== 1) return null;
    const [row, col] = selected[0];
    return sudoku[row - 1][col - 1];
  };

  const isSameValue = (row: SudokuValue, col: SudokuValue): boolean => {
    const selectedValue = getSelectedCellValue();
    if (selectedValue === null) return false;
    return sudoku[row - 1][col - 1] === selectedValue;
  };

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
        (cell, colIndex) =>
          cell === data.puzzles[0].solution[rowIndex][colIndex]
      )
    );
    if (isCorrect) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficulty(parseInt(event.target.value, 10));
  };

  const isSameRowColOrBox = (row: SudokuValue, col: SudokuValue) => {
    if (selected.length !== 1) return false;
    const [selectedRow, selectedCol] = selected[0];
    const sameRow = selectedRow === row;
    const sameCol = selectedCol === col;
    const sameBox =
      Math.floor((selectedRow - 1) / 3) === Math.floor((row - 1) / 3) &&
      Math.floor((selectedCol - 1) / 3) === Math.floor((col - 1) / 3);
    return sameRow || sameCol || sameBox;
  };

  return (
    <Section title="Sudoku" className="bg-zinc-900/30 items-center">
      <div className="mb-4">
        <label htmlFor="difficulty" className="mr-2 text-white">
          Select Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="bg-zinc-800 text-white p-2 border"
        >
          {data.puzzles.map((puzzle, index) => (
            <option key={index} value={index}>
              {puzzle.name}
            </option>
          ))}
        </select>
      </div>
      <div
        className="grid grid-row-3 bg-zinc-900 p-6"
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
            puzzle={difficulty}
            isSameRowColOrBox={isSameRowColOrBox}
            duplicateFlags={duplicateFlags}
            isSameValue={isSameValue}
          />
        ))}
      </div>
      <div className="flex gap-8 items-center">
        <IconButton
          iconClassName="bg-red-900 text-2xl p-3 hover:bg-red-800"
          onClick={() =>
            setSudoku(data.puzzles[difficulty].values as sudokuData)
          }
          icon={faArrowRotateLeft}
        />
        <NumberPad
          onClick={(value: SudokuValue) => updateCells(value)}
          solvedDigits={solvedDigits}
        />
        <IconButton
          iconClassName="bg-green-900 text-2xl p-3 hover:bg-green-800"
          onClick={() => checkSolution()}
          icon={faCheck}
        />
      </div>
      <div className="bg-zinc-900 p-4">
        {solved !== undefined && (
          <p className={solved ? "text-green-400" : "text-red-400"}>
            {solved ? "Solved!" : "Incorrect Solution. Take another look."}
          </p>
        )}
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
    <div className="grid grid-cols-3 gap-2 text-white p-4 bg-zinc-900">
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
  puzzle: number;
  isSameValue: (row: SudokuValue, col: SudokuValue) => boolean;
}

const SudokoBoxRow = ({
  data,
  boxRowIndex,
  selected,
  selectCell,
  onMouseDown,
  onMouseEnter,
  puzzle,
  isSameRowColOrBox,
  duplicateFlags,
  isSameValue,
}: SudokoRowProps & {
  isSameRowColOrBox: (row: SudokuValue, col: SudokuValue) => boolean;
  duplicateFlags: boolean[][];
}) => {
  return (
    <div className="grid grid-cols-3 bg-zinc-900">
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
          puzzle={puzzle}
          isSameRowColOrBox={isSameRowColOrBox}
          duplicateFlags={duplicateFlags}
          isSameValue={isSameValue}
        />
      ))}
    </div>
  );
};

interface SukodkuBoxProps extends SudokoRowProps {
  boxColIndex: 1 | 2 | 3;
  isSameRowColOrBox: (row: SudokuValue, col: SudokuValue) => boolean;
  duplicateFlags: boolean[][];
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
  puzzle,
  isSameRowColOrBox,
  duplicateFlags,
  isSameValue,
}: SukodkuBoxProps & {
  isSameRowColOrBox: (row: SudokuValue, col: SudokuValue) => boolean;
  duplicateFlags: boolean[][];
}) => {
  const boxClasses = classNames("grid grid-cols-3 bg-zinc-900 border");

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
            disabled={cellDisabled(gridRow, gridCol, puzzle)}
            isSameRowColOrBox={isSameRowColOrBox(gridRow, gridCol)}
            duplicate={duplicateFlags[gridRow - 1][gridCol - 1]}
            isSameValue={isSameValue(gridRow, gridCol)}
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
  disabled?: boolean;
  isSameRowColOrBox: boolean;
  duplicate: boolean;
  isSameValue: boolean;
}

const SudokuCell = ({
  row,
  col,
  value,
  selected,
  onMouseDown,
  onMouseEnter,
  disabled,
  isSameRowColOrBox,
  duplicate,
  isSameValue,
}: SudokuCellProps & { duplicate: boolean }) => {
  const divClasses = classNames(
    "border border-gray-700 h-10 w-10 md:h-12 md:w-12",
    {
      " bg-cyan-900": selected,
      " bg-cyan-950/30": isSameRowColOrBox && !selected && !duplicate,
      " font-bold": disabled,
      " bg-red-950 border-red-500 border-3": duplicate,
      " bg-yellow-900/50": isSameValue && !selected, // Highlight same value cells
    }
  );

  const cellClasses = classNames("text-center h-full w-full text-3xl");

  return (
    <div
      className={divClasses}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
    >
      <button className={cellClasses} disabled={disabled}>
        {value ?? ""}
      </button>
    </div>
  );
};

export default Sudoku;
