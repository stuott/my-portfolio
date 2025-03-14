import data from "@data/sudoku.json";

export type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export type CellPosition = [SudokuValue, SudokuValue];

export type SudokuDifficulty = "easy" | "medium" | "hard" | "expert";

export enum MouseActions {
  NONE = 0,
  SELECT = 1,
  DESELECT = 2,
}

export type SudokuPuzzle = {
  difficulty: SudokuDifficulty;
  puzzle: SudokuData;
  mask: SudokuValue[][];
  solution: SudokuValue[][];
};

type borderData = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export class SudokuCellData {
  row: number;
  col: number;
  value: SudokuValue;
  isStatic: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isError: boolean;
  isSelectedValue: boolean;
  selectedBorders: borderData;
  boxPosition: number;
  guesses: SudokuValue[];

  constructor() {
    this.row = 0;
    this.col = 0;
    this.value = null;
    this.isStatic = false;
    this.isSelected = false;
    this.isHighlighted = false;
    this.isError = false;
    this.isSelectedValue = false;
    this.selectedBorders = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };
    this.boxPosition = 0;
    this.guesses = [];
  }

  clear() {
    this.value = null;
    this.isStatic = false;
    this.isSelected = false;
    this.isHighlighted = false;
    this.isError = false;
    this.isSelectedValue = false;
    this.selectedBorders = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };
    this.guesses = [];
  }
}

export class SudokuData {
  cells: SudokuCellData[][];
  puzzleIndex: number;
  selectedCells: SudokuCellData[];
  showErrors: boolean;
  showSameValue: boolean;
  digitCounts: number[];
  solved: boolean | null;
  showHighlight: boolean;
  startTime: number | null;
  endTime: number | null;

  constructor() {
    this.cells = [];
    for (let i = 0; i < 9; i++) {
      this.cells.push([]);
      for (let j = 0; j < 9; j++) {
        const newCell = new SudokuCellData();
        newCell.row = i;
        newCell.col = j;
        newCell.boxPosition = getBoxPosition(i, j);
        this.cells[i].push(newCell);
      }
    }
    this.puzzleIndex = 0;
    this.changePuzzle(0);
    this.selectedCells = [];
    this.showErrors = true;
    this.showSameValue = true;
    this.digitCounts = new Array(9).fill(0);
    this.solved = null;
    this.showHighlight = true;
    this.startTime = null;
    this.endTime = null;
  }

  // Interal utility functions

  /**
   * Call a function for each cell in the Sudoku grid
   * @param callback The function to call for each cell
   */
  private forAllCells(callback: (cell: SudokuCellData) => void) {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        callback(cell);
      });
    });
  }

  /**
   * Updates the digit counts and checks for errors
   * Called when a cell is updated
   */
  private onCellUpdate() {
    this.digitCounts = new Array(9).fill(0);
    this.forAllCells((cell) => {
      if (cell.value) {
        this.digitCounts[cell.value - 1]++;
      }
    });

    this.checkForErrors();
    this.updateSelectedValue();
  }

  /**
   * Checks for errors in the Sudoku grid
   */
  private checkForErrors() {
    this.forAllCells((cell) => {
      cell.isError = false;
    });

    if (!this.showErrors) return;

    // Check rows and columns for duplicates
    for (let i = 0; i < 9; i++) {
      const rowValues: Map<SudokuValue, number> = new Map();
      const colValues: Map<SudokuValue, number> = new Map();
      for (let j = 0; j < 9; j++) {
        const rowCell = this.cells[i][j];
        const colCell = this.cells[j][i];
        if (rowCell.value !== null) {
          if (rowValues.has(rowCell.value)) {
            rowCell.isError = true;
            this.cells[i][rowValues.get(rowCell.value)!].isError = true;
          } else {
            rowValues.set(rowCell.value, j);
          }
        }
        if (colCell.value !== null) {
          if (colValues.has(colCell.value)) {
            colCell.isError = true;
            this.cells[colValues.get(colCell.value)!][i].isError = true;
          } else {
            colValues.set(colCell.value, j);
          }
        }
      }
    }

    // Check boxes for duplicates
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const boxValues: Map<SudokuValue, [number, number]> = new Map();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const cell = this.cells[boxRow * 3 + i][boxCol * 3 + j];
            if (cell.value !== null) {
              if (boxValues.has(cell.value)) {
                cell.isError = true;
                const [r, c] = boxValues.get(cell.value)!;
                this.cells[r][c].isError = true;
              } else {
                boxValues.set(cell.value, [boxRow * 3 + i, boxCol * 3 + j]);
              }
            }
          }
        }
      }
    }
  }

  // Public data functions

  /**
   * Load a new puzzle into the Sudoku grid
   * @param index The index of the puzzle to load
   */
  public changePuzzle(index: number) {
    const puzzleData = data.puzzles[index].values as SudokuValue[][];
    this.puzzleIndex = index;
    this.forAllCells((cell) => {
      cell.clear();
      const newValue = puzzleData[cell.row][cell.col];
      cell.value = newValue;
      cell.isStatic = newValue !== null;
    });
    this.solved = null;
    this.selectedCells = [];
  }

  /**
   * Selects a cell in the Sudoku grid
   * @param row the row of the cell to select
   * @param col the column of the cell to select
   * @param append true if the cell should be added to the selection, false if it should replace the current selection
   */
  public selectCell(row: number, col: number, append: boolean) {
    const cell = this.cells[row][col];
    if (!append) {
      this.deselectAllCells();
    }
    if (!this.selectedCells.some((cell) => cellInPosition(cell, row, col))) {
      this.selectedCells.push(cell);
    }
    cell.isSelected = true;
    this.updateHighlighted();
    this.updateSelectedValue();
    this.calculateBordersForSelectedCells();
  }

  /**
   * De-selects a cell in the Sudoku grid
   * @param row the row of the cell to deselect
   * @param col the column of the cell to deselect
   */
  public deselectCell(row: number, col: number) {
    this.cells[row][col].isSelected = false;
    this.cells[row][col].selectedBorders = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };
    const cellIndex = this.selectedCells.findIndex((cell) =>
      cellInPosition(cell, row, col)
    );
    if (cellIndex !== -1) {
      this.selectedCells.splice(cellIndex, 1);
    }
  }

  /**
   * De-selects all cells in the Sudoku grid
   */
  public deselectAllCells() {
    this.selectedCells = [];
    this.forAllCells((cell) => {
      this.deselectCell(cell.row, cell.col);
    });
  }

  /**
   * Updates the value of the selected cells
   * Populates the cell with the value if it is not already set, otherwise clears the cell
   * @param value The value to set or clear in the selected cells
   */
  public updateSelectedCells(value: SudokuValue) {
    this.selectedCells.forEach((cell) => {
      if (!cell.isStatic) {
        if (cell.value === value) {
          cell.value = null;
        } else {
          cell.value = value;
        }
      }
    });

    this.onCellUpdate();
  }

  /**
   * Clears the value of the selected cells
   */
  public clearSelectedCells() {
    this.selectedCells.forEach((cell) => {
      if (!cell.isStatic) {
        if (cell.value) {
          cell.value = null;
          return;
        }
        cell.guesses = [];
      }
    });
    this.onCellUpdate();
  }

  /**
   * Updates the guesses of the selected cells
   * Adds the guess to the cell if it is not already present, otherwise removes it
   * @param guess The guess to add or remove from the selected cells
   */
  public updateSelectedGuesses(guess: SudokuValue) {
    this.selectedCells.forEach((cell) => {
      if (!cell.isStatic && !cell.value) {
        if (cell.guesses.includes(guess)) {
          cell.guesses = cell.guesses.filter((g) => g !== guess);
        } else {
          cell.guesses.push(guess);
        }
        cell.guesses.sort();
      }
    });
  }

  /**
   * Updates the highlighted status of all cells based on the selected cells
   */
  public updateHighlighted() {
    if (this.selectedCells.length === 0) {
      this.forAllCells((cell) => {
        cell.isHighlighted = false;
      });
      return;
    }

    if (this.selectedCells.length > 1) {
      this.forAllCells((cell) => {
        cell.isHighlighted = false;
      });
      return;
    }

    const selectedCell = this.selectedCells[0];

    this.forAllCells((cell) => {
      cell.isHighlighted = false;
      if (
        cell.row === selectedCell.row ||
        cell.col === selectedCell.col ||
        cellsInSameBox(cell, selectedCell)
      ) {
        cell.isHighlighted = this.showHighlight && true;
      }
    });
  }

  /**
   * Updates the selected value status of all cells based on the selected cells
   */
  public updateSelectedValue() {
    this.forAllCells((cell) => {
      cell.isSelectedValue = false;
      if (this.selectedCells.length > 0 && this.showSameValue) {
        if (cell.value && cell.value === this.selectedCells[0].value) {
          cell.isSelectedValue = true;
        }
      }
    });
  }

  /**
   * Checks if the Sudoku grid is solved
   */
  public checkSolution() {
    const solutionData = data.puzzles[this.puzzleIndex]
      .solution as SudokuValue[][];

    let badValue = false;

    this.cells.forEach((row) => {
      row.forEach((cell) => {
        if (solutionData[cell.row][cell.col] !== cell.value) {
          badValue = true;
        }
      });
    });

    this.solved = !badValue;
  }

  /**
   * Checks if a digit is solved
   * @param digit The digit to check
   */
  public checkDigitSolved(digit: number) {
    return this.digitCounts[digit - 1] >= 9;
  }

  /**
   * Shows or hides the same value cell highlights
   * @param show true to show the same value cells, false to hide them
   */
  public showSameValues(show: boolean) {
    this.showSameValue = show;
    this.updateSelectedValue();
  }

  /**
   * Calculates the borders for the selected cells
   * Sets the selectedBorders property of each selected cell
   *  - top: true if the cell is at the top of the grid or the cell above is not selected
   *  - bottom: true if the cell is at the bottom of the grid or the cell below is not selected
   *  - left: true if the cell is at the left edge of the grid or the cell to the left is not selected
   *  - right: true if the cell is at the right edge of the grid or the cell to the right is not selected
   */
  public calculateBordersForSelectedCells() {
    this.selectedCells.forEach((cell) => {
      cell.selectedBorders = {
        top: false,
        bottom: false,
        left: false,
        right: false,
      };

      if (
        cell.row == 0 ||
        (cell.row > 0 && !this.cells[cell.row - 1][cell.col].isSelected)
      ) {
        cell.selectedBorders.top = true;
      }
      if (
        cell.row == 8 ||
        (cell.row < 8 && !this.cells[cell.row + 1][cell.col].isSelected)
      ) {
        cell.selectedBorders.bottom = true;
      }
      if (
        cell.col == 0 ||
        (cell.col > 0 && !this.cells[cell.row][cell.col - 1].isSelected)
      ) {
        cell.selectedBorders.left = true;
      }
      if (
        cell.col == 8 ||
        (cell.col < 8 && !this.cells[cell.row][cell.col + 1].isSelected)
      ) {
        cell.selectedBorders.right = true;
      }
    });
  }

  /**
   * Displays or hides the errors in the Sudoku grid
   * @param show true to show the error display, false to hide it
   */
  public updateErrorDisplay(show: boolean) {
    this.showErrors = show;
    this.checkForErrors();
  }
}

// Helper functions

/**
 * Determines if two cells are in the same box
 * @param firstCell the cell to check against
 * @param secondCell the cell to check
 * @returns true if the cells are in the same box, false otherwise
 */
const cellsInSameBox = (
  firstCell: SudokuCellData | null,
  secondCell: SudokuCellData | null
) => {
  if (!firstCell || !secondCell) return false;
  return (
    Math.floor(firstCell.row / 3) === Math.floor(secondCell.row / 3) &&
    Math.floor(firstCell.col / 3) === Math.floor(secondCell.col / 3)
  );
};

/**
 * Gets the position of a cell in its box
 * - 1 2 3
 * - 4 5 6
 * - 7 8 9
 * @param row the row of the cell
 * @param col the column of the cell
 * @returns the position of the cell in its box
 */
const getBoxPosition = (row: number, col: number): number => {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  const positionInBox = (row - boxRow) * 3 + (col - boxCol) + 1;
  return positionInBox;
};

/**
 * Checks if a cell is in the given row and column
 * @param cell the cell to check
 * @param row the row to check against
 * @param col the column to check against
 * @returns true if the cell is in the given row and column, false otherwise
 */
const cellInPosition = (cell: SudokuCellData, row: number, col: number) => {
  return cell.row === row && cell.col === col;
};
