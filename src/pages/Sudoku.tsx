import Section from "@components/layout/Section";
import { NumberPad, SudokuRow } from "@components/sudoku";
import SudokuMenu from "@components/sudoku/SudokuMenu";
import { SudokuProvider, useSudoku } from "@components/sudoku/SudokuProvider";
import { page } from "pages";
import { useCallback, useEffect, useState } from "react";
import { SudokuValue } from "types/sudoku";

const Sudoku = () => {
  const { sudoku, selectCell, deselectCells, updateSelectedCells } =
    useSudoku();
  const [isDragging, setIsDragging] = useState(false);
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [multiSelect, setMultiSelect] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    selectCell(row, col, multiSelect);
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDragging) {
      selectCell(row, col, true);
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
          keys: ["Shift"],
          action: () => setMultiSelect(true),
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
            <SudokuMenu />
            <NumberPad
              onClick={(value: SudokuValue) => updateSelectedCells(value)}
            />
          </div>
        </div>
        {sudoku.solved !== null && (
          <div className="bg-zinc-900 md:pt-6">
            <p className={sudoku.solved ? "text-green-400" : "text-red-400"}>
              {sudoku.solved
                ? "Solved!"
                : "That's not right! Take another look."}
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
