import Section from "@components/layout/Section";
import { NumberPad, SudokuRow } from "@components/sudoku";
import SudokuMenu from "@components/sudoku/SudokuMenu";
import { SudokuProvider, useSudoku } from "@components/sudoku/SudokuProvider";
import { page } from "pages";
import { useCallback, useEffect, useState } from "react";
import { SudokuValue } from "types/sudoku";

const Sudoku = () => {
  const {
    sudoku,
    selectCell,
    deselectCells,
    updateSelectedCells,
    updateSelectedGuesses,
    clearSelectedCells,
  } = useSudoku();
  const [isDragging, setIsDragging] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      selectCell(row, col, multiSelect);
      setIsDragging(true);
    },
    [selectCell, multiSelect]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (isDragging) {
        selectCell(row, col, true);
      }
    },
    [isDragging, selectCell]
  );

  const handleKeyChange = useCallback(
    (event: KeyboardEvent, keyUp: boolean = false) => {
      if (event.repeat) return;
      if (keyUp) setLastKeyPressed(null);
      if (lastKeyPressed == event.key) return;

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
            clearSelectedCells();
          },
        },
        {
          keys: ["Shift"],
          action: () => {
            setMultiSelect(!keyUp);
          },
        },
        {
          codes: [
            "Digit0",
            "Digit1",
            "Digit2",
            "Digit3",
            "Digit4",
            "Digit5",
            "Digit6",
            "Digit7",
            "Digit8",
            "Digit9",
          ],
          action: () => {
            if (keyUp) return;
            const value = parseInt(event.code.charAt(event.code.length - 1));
            if (value < 1 && value > 9) return;
            if (event.shiftKey) {
              updateSelectedGuesses(value as SudokuValue);
            } else {
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

      const keyMatch = keyActions.findIndex(
        (keyAction) =>
          keyAction.keys?.includes(event.key) ||
          keyAction.codes?.includes(event.code)
      );

      if (keyMatch != -1) {
        keyActions[keyMatch]?.action();
      }
    },
    [deselectCells, updateSelectedCells, selectCell, clamp]
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
  }, [handleKeyChange]);

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
