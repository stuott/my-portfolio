import data from "@data/sudoku.json";

export type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CellPosition = [number, number];
export type CellData = SudokuValue | null;
export type RowData = CellData[];
export type SudokuData = RowData[];

/**
 * Get the digits that are solved in the sudoku (have all 9 instances filled in)
 * @param sudoku The sudoku data
 * @returns An array of digits that are already filled in completely
 */
export const getSolvedDigits = (sudoku: SudokuData): SudokuValue[] => {
  // create a dictionary to store the count of each digit
  const digitCount: { [key: number]: number } = {};
  for (const digit of [1, 2, 3, 4, 5, 6, 7, 8, 9] as SudokuValue[]) {
    digitCount[digit] = 0;
  }

  // count the number of times each digit appears in the sudoku
  sudoku.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== null) {
        digitCount[cell]++;
      }
    });
  });

  // return the digits that are already filled in completely
  return Object.keys(digitCount)
    .filter((digit) => digitCount[parseInt(digit) as SudokuValue] >= 9)
    .map((digit) => parseInt(digit) as SudokuValue);
};

export const getDuplicateFlags = (sudoku: SudokuData): boolean[][] => {
  // create a 2D array to store the flags for duplicate values
  const duplicateFlags: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(false)
  );

  // check for duplicate values in rows and columns
  for (let i = 0; i < 9; i++) {
    // rows
    const rowValues = sudoku[i];
    rowValues.forEach((value, j) => {
      if (value !== null && rowValues.indexOf(value) !== j) {
        duplicateFlags[i][j] = true;
        duplicateFlags[i][rowValues.indexOf(value)] = true;
      }
    });

    // columns
    const colValues = sudoku.map((row) => row[i]);
    colValues.forEach((value, j) => {
      if (value !== null && colValues.indexOf(value) !== j) {
        duplicateFlags[j][i] = true;
        duplicateFlags[colValues.indexOf(value)][i] = true;
      }
    });
  }

  // check for duplicate values in each box
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      // iterate over each cell in the box
      const boxValues: { [key in SudokuValue]?: [number, number] } = {};
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // get the row and column indices of the cell
          const rowIndex = boxRow * 3 + i;
          const colIndex = boxCol * 3 + j;
          const value = sudoku[rowIndex][colIndex];
          if (value !== null) {
            // if we've seen the value before, mark both cells as duplicates
            if (boxValues[value]) {
              duplicateFlags[rowIndex][colIndex] = true;
              const [dupRow, dupCol] = boxValues[value] as [number, number];
              duplicateFlags[dupRow][dupCol] = true;
            } else {
              // otherwise, store the cell's position
              boxValues[value] = [rowIndex, colIndex];
            }
          }
        }
      }
    }
  }

  return duplicateFlags;
};

export const isCellStatic = (
  row: SudokuValue,
  col: SudokuValue,
  puzzle: number
) => {
  return data.puzzles[puzzle].mask[row][col];
};

export enum MouseActions {
  NONE = 0,
  SELECT = 1,
  DESELECT = 2,
}
