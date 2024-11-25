import data from "data/sudoku.json";

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
  // Create a dictionary to store the count of each digit
  const digitCount: { [key: number]: number } = {};
  for (const digit of [1, 2, 3, 4, 5, 6, 7, 8, 9] as SudokuValue[]) {
    digitCount[digit] = 0;
  }

  // Count the number of times each digit appears in the sudoku
  sudoku.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== null) {
        digitCount[cell]++;
      }
    });
  });

  // Return the digits that are already filled in completely
  return Object.keys(digitCount)
    .filter((digit) => digitCount[parseInt(digit) as SudokuValue] >= 9)
    .map((digit) => parseInt(digit) as SudokuValue);
};

export const getDuplicateFlags = (sudoku: SudokuData): boolean[][] => {
  const duplicateFlags: boolean[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(false)
  );

  for (let i = 0; i < 9; i++) {
    const rowValues = sudoku[i];
    const colValues = sudoku.map((row) => row[i]);

    rowValues.forEach((value, j) => {
      if (value !== null && rowValues.indexOf(value) !== j) {
        duplicateFlags[i][j] = true;
        duplicateFlags[i][rowValues.indexOf(value)] = true;
      }
    });

    colValues.forEach((value, j) => {
      if (value !== null && colValues.indexOf(value) !== j) {
        duplicateFlags[j][i] = true;
        duplicateFlags[colValues.indexOf(value)][i] = true;
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
