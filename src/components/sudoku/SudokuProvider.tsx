import React, {
  createContext,
  // useCallback,
  useContext,
  // useEffect,
  useState,
} from "react";
import { SudokuData, SudokuValue } from "types/sudoku";

interface SudokuContextProps {
  sudoku: SudokuData;
  changePuzzle: (index: number) => void;
  selectCell: (row: number, col: number, append: boolean) => void;
  deselectCells: () => void;
  updateSelectedCells: (value: SudokuValue) => void;
  updateSelectedGuesses: (guess: SudokuValue) => void;
  showErrors: (show: boolean) => void;
  checkSolution: () => void;
  showSameValues: (show: boolean) => void;
}

const SudokuContext = createContext<SudokuContextProps | undefined>(undefined);

export const SudokuProvider = ({ children }: { children: React.ReactNode }) => {
  const [sudoku, setSudoku] = useState<SudokuData>(new SudokuData());

  const dataChange = (callback: (data: SudokuData) => void) => {
    setSudoku((prevSudoku) => {
      const newSudoku = new SudokuData();
      Object.assign(newSudoku, prevSudoku);
      callback(newSudoku);
      return newSudoku;
    });
  };

  const callbacks = {
    changePuzzle: (index: number) => {
      dataChange((sudoku) => {
        sudoku.changePuzzle(index);
      });
    },
    selectCell: (row: number, col: number, append: boolean) => {
      dataChange((sudoku) => {
        sudoku.selectCell(row, col, append);
      });
    },
    deselectCells: () => {
      dataChange((sudoku) => {
        sudoku.deselectAllCells();
      });
    },
    updateSelectedCells: (value: SudokuValue) => {
      dataChange((sudoku) => {
        sudoku.updateSelectedCells(value);
      });
    },
    updateSelectedGuesses: (guess: SudokuValue) => {
      dataChange((sudoku) => {
        sudoku.updateSelectedGuesses(guess);
      });
    },
    showErrors: (show: boolean) => {
      dataChange((sudoku) => {
        sudoku.showErrors = show;
        if (show) {
          sudoku.checkForErrors();
        } else {
          sudoku.clearErrors();
        }
      });
    },
    checkSolution: () => {
      dataChange((sudoku) => {
        sudoku.checkSolution();
      });
    },
    showSameValues: (show: boolean) => {
      dataChange((sudoku) => {
        sudoku.showSameValues(show);
      });
    },
  };

  return (
    <SudokuContext.Provider value={{ sudoku, ...callbacks }}>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudoku = () => {
  const context = useContext(SudokuContext);
  if (context === undefined) {
    throw new Error("useSudoku must be used within a SudokuProvider");
  }
  return context;
};
