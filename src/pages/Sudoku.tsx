import IconButton from "@components/controls/Button";
import Checkbox from "@components/controls/Checkbox";
import Section from "@components/layout/Section";
import { NumberPad, SudokuRow } from "@components/sudoku";
import {
  CellPosition,
  getDuplicateFlags,
  getSolvedDigits,
  MouseActions,
  SudokuData,
  SudokuValue,
} from "@components/sudoku/sudokuUtils";
import data from "@data/sudoku.json";
import { faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { page } from "pages";
import { useCallback, useEffect, useState } from "react";

const Sudoku = () => {
  const [puzzle, setPuzzle] = useState(0);
  const [sudoku, setSudoku] = useState<SudokuData>(
    data.puzzles[puzzle].values as SudokuData
  );
  const [selectedCells, setSelectedCells] = useState<CellPosition[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentAction, setCurrentAction] = useState<MouseActions>(0);
  const [solvedDigits, setSolvedDigits] = useState<SudokuValue[]>([]);
  const [duplicateFlags, setDuplicateFlags] = useState<boolean[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
  const [solved, setSolved] = useState<boolean | undefined>(undefined);

  const [allowMultiSelect, setAllowMultiSelect] = useState(true);
  const [allowErrorChecking, setAllowErrorChecking] = useState(true);
  const [highlightSameValues, setHighlightSameValues] = useState(true);

  const updateCells = useCallback(
    (value?: SudokuValue) => {
      if (selectedCells.length === 0) return;

      // Update the selected cells with the new value
      const newSudoku: SudokuData = sudoku.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          // Check if the cell is selected and not static
          const isSelected = selectedCells.some(
            ([cellRow, cellCol]) => cellRow === rowIndex && cellCol === colIndex
          );

          const isStatic = data.puzzles[puzzle].mask[rowIndex][colIndex];

          if (isSelected && !isStatic) {
            return value !== undefined ? (col === value ? null : value) : null;
          }

          return col;
        })
      );

      // Update the duplicate flags
      setDuplicateFlags(getDuplicateFlags(newSudoku));

      // Update the sudoku state
      setSudoku(newSudoku);
    },
    [selectedCells, sudoku, puzzle]
  );

  const handleKeyChange = useCallback(
    (event: KeyboardEvent, keyUp: boolean = false) => {
      const keyActions = [
        {
          keys: ["Escape"],
          action: () => {
            if (!keyUp) {
              setSelectedCells([]);
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
          action: () =>
            allowMultiSelect
              ? setIsMultiSelect(!keyUp)
              : setIsMultiSelect(false),
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
              const [row, col] = selectedCells[selectedCells.length - 1];
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
                setSelectedCells((prevSelected) => [
                  ...prevSelected,
                  [newRow, newCol],
                ]);
              } else {
                setSelectedCells([[newRow, newCol]]);
              }
            }
          },
        },
      ];

      if (keyActions.some((action) => action.keys.includes(event.key))) {
        keyActions.find((action) => action.keys.includes(event.key))?.action();
      }
    },
    [updateCells, selectedCells, isMultiSelect]
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

    setSolvedDigits(getSolvedDigits(sudoku));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [sudoku, handleKeyChange]);

  useEffect(() => {
    setSudoku(data.puzzles[puzzle].values as SudokuData);
  }, [puzzle]);

  const getSelectedCellValue = (): SudokuValue | null => {
    if (selectedCells.length !== 1) return null;
    const [row, col] = selectedCells[0];
    return sudoku[row][col];
  };

  const selectCell = (row: number, col: number, isDragging = false) => {
    const cellIndex = selectedCells.findIndex(
      ([selectedRow, selectedCol]) => selectedRow === row && selectedCol === col
    );
    if (isMultiSelect || isDragging) {
      if (cellIndex === -1) {
        if (currentAction === MouseActions.DESELECT) {
          return;
        }
        setSelectedCells([...selectedCells, [row, col]]);
      } else if (isDragging) {
        if (currentAction === MouseActions.SELECT) {
          return;
        }
        setSelectedCells(
          selectedCells.filter((_, index) => index !== cellIndex)
        );
      }
    } else {
      if (cellIndex === -1) {
        setSelectedCells([[row, col]]);
      } else {
        setSelectedCells([]);
      }
    }
  };

  const handleMouseDown = (row: number, col: number) => {
    if (
      selectedCells.some(
        ([selectedRow, selectedCol]) =>
          selectedRow === row && selectedCol === col
      )
    ) {
      setCurrentAction(MouseActions.DESELECT);
    } else {
      setCurrentAction(MouseActions.SELECT);
    }
    selectCell(row, col);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setCurrentAction(MouseActions.NONE);
    setIsDragging(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      selectCell(row, col, true);
    }
  };

  const checkSolution = () => {
    const isCorrect = sudoku.every((row, rowIndex) =>
      row.every(
        (cell, colIndex) =>
          cell === data.puzzles[puzzle].solution[rowIndex][colIndex]
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
    setPuzzle(parseInt(event.target.value, 10));
    setSolved(undefined);
  };

  const getIsSameValueFlags = (row: number) => {
    if (!highlightSameValues) {
      return Array(9).fill(false);
    }
    return sudoku[row].map((value) => value === getSelectedCellValue());
  };

  const getErrors = (row: number) => {
    if (!allowErrorChecking) {
      return Array(9).fill(false);
    }
    return duplicateFlags[row];
  };

  return (
    <>
      <div className="h-16" />
      <Section
        title="Sudoku"
        className="items-center bg-zinc-900 py-8 md:pb-16"
      >
        <div className="flex flex-col md:flex-row md:gap-6">
          <div
            className="flex flex-col bg-zinc-900 justify-items-center border border-4"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <>
                <SudokuRow
                  selectedCells={selectedCells}
                  row={sudoku[i]}
                  rowIndex={i}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  disabled={data.puzzles[puzzle].mask[i].includes(true)}
                  duplicateFlags={getErrors(i)}
                  isSameValueFlags={getIsSameValueFlags(i)}
                  puzzle={puzzle}
                />
                {(i === 2 || i === 5) && <div className="bg-zinc-300 h-1" />}
              </>
            ))}
          </div>
          <div className="flex md:flex-col items-center justify-center bg-zinc-900">
            <div className="flex flex-col gap-3 items-center">
              <p className="text-white">Select a difficulty:</p>
              <select
                value={puzzle}
                onChange={handleDifficultyChange}
                className="bg-zinc-800 text-white p-2 border"
                defaultValue={0}
              >
                {data.puzzles.map((puzzle, index) => (
                  <option key={index} value={index}>
                    {puzzle.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-3">
                <IconButton
                  className="bg-red-900 text-2xl p-3 hover:bg-red-800"
                  onClick={() => {
                    setSudoku(data.puzzles[puzzle].values as SudokuData);
                    setSolved(undefined);
                  }}
                  icon={faArrowRotateLeft}
                />
                <IconButton
                  className="bg-green-900 text-2xl p-3 hover:bg-green-800"
                  onClick={() => checkSolution()}
                  icon={faCheck}
                />
              </div>
            </div>
            <NumberPad
              onClick={(value: SudokuValue) => updateCells(value)}
              solvedDigits={solvedDigits}
            />
            <div className="flex flex-col gap-2 items-start">
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={allowMultiSelect}
                  onChange={(e) => setAllowMultiSelect(e.target.checked)}
                />
                Allow Multi-select
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={allowErrorChecking}
                  onChange={(e) => {
                    setAllowErrorChecking(e.target.checked);
                  }}
                />
                Error Checking
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={highlightSameValues}
                  onChange={(e) => {
                    setHighlightSameValues(e.target.checked);
                  }}
                />
                Highlight Same Values
              </div>
            </div>
          </div>
        </div>
        {solved !== undefined && (
          <div className="bg-zinc-900 md:pt-6">
            <p className={solved ? "text-green-400" : "text-red-400"}>
              {solved ? "Solved!" : "That's not right! Take another look."}
            </p>
          </div>
        )}
      </Section>
    </>
  );
};

export const pageInfo: page = {
  path: "/sudoku",
  name: "Sudoku",
  Component: Sudoku,
  showInNavbar: false,
  background: "bg-sudoku",
};
