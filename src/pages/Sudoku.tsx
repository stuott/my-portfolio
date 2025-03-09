import IconButton from "@components/controls/Button";
import Checkbox from "@components/controls/Checkbox";
import Section from "@components/layout/Section";
import { NumberPad, SudokuRow } from "@components/sudoku";
import { SudokuProvider, useSudoku } from "@components/sudoku/SudokuProvider";
import data from "@data/sudoku.json";
import { faArrowRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { page } from "pages";
import { useCallback, useEffect, useState } from "react";
import { SudokuValue } from "types/sudoku";

const Sudoku = () => {
  const {
    sudoku,
    changePuzzle,
    selectCell,
    deselectCells,
    updateSelectedCells,
    showErrors,
  } = useSudoku();
  const [puzzle, setPuzzle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [solved, setSolved] = useState<boolean | null>(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [allowMultiSelect, setAllowMultiSelect] = useState(true);

  const handleMouseDown = (row: number, col: number) => {
    selectCell(row, col, multiSelect);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      selectCell(row, col, multiSelect);
    }
  };

  const handleKeyChange = useCallback(
    (event: KeyboardEvent, keyUp: boolean = false) => {
      if (keyUp) {
        setMultiSelect(false);
        setKeyPressed(null);
        return;
      }

      if (keyPressed === event.key) return;

      setKeyPressed(event.key);

      const keyActions = [
        {
          keys: ["Escape"],
          action: () => {
            if (keyUp) return;
            deselectCells();
          },
        },
        {
          keys: ["Delete", "Backspace"],
          action: () => {
            if (keyUp) return;
            updateSelectedCells(null);
          },
        },
        {
          keys: ["Ctrl", "Shift"],
          action: () => setMultiSelect(allowMultiSelect),
        },
        {
          keys: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          action: () => {
            if (keyUp) return;
            const value = parseInt(event.key, 10);
            if (value >= 1 && value <= 9) {
              updateSelectedCells(value as SudokuValue);
            }
          },
        },
        {
          keys: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
          action: () => {
            if (keyUp) return;
            event.preventDefault();

            const prevCell =
              sudoku.selectedCells[sudoku.selectedCells.length - 1];
            let newRow = prevCell.row;
            let newCol = prevCell.col;

            switch (event.key) {
              case "ArrowUp":
                newRow = prevCell.row - 1;
                break;
              case "ArrowDown":
                newRow = prevCell.row + 1;
                break;
              case "ArrowLeft":
                newCol = prevCell.col - 1;
                break;
              case "ArrowRight":
                newCol = prevCell.col + 1;
                break;
            }
            selectCell(clamp(newRow, 0, 8), clamp(newCol, 0, 8), multiSelect);
          },
        },
      ];

      if (keyActions.some((action) => action.keys.includes(event.key))) {
        keyActions.find((action) => action.keys.includes(event.key))?.action();
      }
    },
    [deselectCells, updateSelectedCells, keyPressed]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKeyChange(event);
    const handleKeyUp = (event: KeyboardEvent) => handleKeyChange(event, true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [sudoku, handleKeyChange]);

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
            {Array.from({ length: 9 }, (_, index) => (
              <>
                <SudokuRow
                  key={"sudokuRow_" + index}
                  row={sudoku.cells[index]}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                />
                {(index === 2 || index === 5) && (
                  <div
                    key={"divider_row_" + index}
                    className="bg-zinc-300 h-1"
                  />
                )}
              </>
            ))}
          </div>
          <div className="flex md:flex-col items-center justify-center bg-zinc-900">
            <div className="flex flex-col gap-3 items-center">
              <p className="text-white">Select a difficulty:</p>
              <select
                value={puzzle}
                onChange={(e) => {
                  const index = parseInt(e.target.value);
                  changePuzzle(index);
                  setPuzzle(index);
                }}
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
                    changePuzzle(puzzle);
                    setSolved(null);
                  }}
                  icon={faArrowRotateLeft}
                />
                <IconButton
                  className="bg-green-900 text-2xl p-3 hover:bg-green-800"
                  onClick={() => setSolved(sudoku.checkSolution())}
                  icon={faCheck}
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={sudoku.showErrors}
                    onChange={(e) => showErrors(e.target.checked)}
                  />
                  Error Checking
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={allowMultiSelect}
                    onChange={(e) => setAllowMultiSelect(e.target.checked)}
                  />
                  Use Multiselect
                </div>
              </div>
            </div>
            <NumberPad
              onClick={(value: SudokuValue) => updateSelectedCells(value)}
            />
          </div>
        </div>
        {solved !== null && (
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

/**
 * Clamps a number between two threshold values.
 * @param value - The number to clamp.
 * @param min - The minimum threshold.
 * @param max - The maximum threshold.
 * @returns The clamped number.
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const SudokuWrapper = () => {
  return (
    <SudokuProvider>
      <Sudoku />
    </SudokuProvider>
  );
};

export const pageInfo: page = {
  path: "/sudoku",
  name: "Sudoku",
  Component: SudokuWrapper,
  showInNavbar: false,
  background: "bg-sudoku",
};
