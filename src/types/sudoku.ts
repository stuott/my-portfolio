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
  guess: SudokuValue;

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
    this.guess = null;
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
    this.guess = null;
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

  constructor() {
    // Initialize the Sudoku grid with empty cells
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
  }

  forAllCells(callback: (cell: SudokuCellData) => void) {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        callback(cell);
      });
    });
  }

  /**
   * Reset the Sudoku grid with the given data
   * @param data SudokuValue[][] - The new Sudoku puzzle data
   */
  changePuzzle(index: number) {
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

  selectCell(row: number, col: number, append: boolean) {
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

  deselectCell(row: number, col: number) {
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

  deselectAllCells() {
    this.selectedCells = [];
    this.forAllCells((cell) => {
      this.deselectCell(cell.row, cell.col);
    });
  }

  updateSelectedCells(value: SudokuValue) {
    this.selectedCells.forEach((cell) => {
      if (!cell.isStatic) {
        if (cell.value === value) {
          cell.value = null;
        } else {
          cell.value = value;
        }
      }
    });

    this.checkForErrors();
    this.updateSelectedValue();
  }

  updateSelectedGuesses(guess: SudokuValue) {
    this.selectedCells.forEach((cell) => {
      if (!cell.isStatic && !cell.value) {
        if (cell.guess === guess) {
          cell.guess = null;
        } else {
          cell.guess = guess;
        }
      }
    });
  }

  updateHighlighted() {
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
        cell.isHighlighted = true;
      }
    });
  }

  updateSelectedValue() {
    this.forAllCells((cell) => {
      cell.isSelectedValue = false;
      if (this.selectedCells.length > 0 && this.showSameValue) {
        if (cell.value && cell.value === this.selectedCells[0].value) {
          cell.isSelectedValue = true;
        }
      }
    });
  }

  checkForErrors() {
    this.forAllCells((cell) => {
      cell.isError = false;
    });

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

  clearErrors() {
    this.forAllCells((cell) => {
      cell.isError = false;
    });
  }

  checkSolution() {
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

  checkDigitSolved(digit: number) {
    return this.digitCounts[digit - 1] >= 9;
  }

  showSameValues(show: boolean) {
    this.showSameValue = show;
    this.updateSelectedValue();
  }

  calculateBordersForSelectedCells() {
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
}

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

const getBoxPosition = (row: number, col: number): number => {
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  const positionInBox = (row - boxRow) * 3 + (col - boxCol) + 1;
  return positionInBox;
};

const cellInPosition = (cell: SudokuCellData, row: number, col: number) => {
  return cell.row === row && cell.col === col;
};
