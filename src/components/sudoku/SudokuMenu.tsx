import Checkbox from "@components/controls/Checkbox";
import {
  faArrowRotateLeft,
  faCheck,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "@components/controls/Modal";
import data from "@data/sudoku.json";
import { useState } from "react";
import { useSudoku } from "./SudokuProvider";

const SudokuMenu = () => {
  const { sudoku, changePuzzle, showErrors, showSameValues } = useSudoku();
  const [puzzle, setPuzzle] = useState(0);

  return (
    <div className="flex flex-col gap-3 items-center">
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
        <HotkeyLegend />
        <ResetConfirm puzzleIndex={puzzle} />
        <CheckSolution />
      </div>
      <div className="space-y-3">
        <Checkbox
          label="error checking"
          checked={sudoku.showErrors}
          onChange={(e) => showErrors(e.target.checked)}
        />
        <Checkbox
          label="highlight value"
          checked={sudoku.showSameValue}
          onChange={(e) => showSameValues(e.target.checked)}
        />
      </div>
    </div>
  );
};

const HotkeyLegend = () => {
  return (
    <Modal
      buttonTooltip="hotkey legend"
      buttonIcon={faRectangleList}
      title="Hotkeys"
    >
      <div className="space-y-2">
        <div>
          <span className="font-bold">1-9:</span>{" "}
          <span className="italic">set value of selected cells</span>
        </div>
        <div>
          <span className="font-bold">Backspace:</span>{" "}
          <span className="italic">clear value of selected cells</span>
        </div>
        <div>
          <span className="font-bold">Shift:</span>{" "}
          <span className="italic">enable multi-select</span>
        </div>
        <div>
          <span className="font-bold">Arrow keys:</span>{" "}
          <span className="italic">navigate cells</span>
        </div>
        <div>
          <span className="font-bold">Escape:</span>{" "}
          <span className="italic">deselect cells</span>
        </div>
      </div>
    </Modal>
  );
};

const ResetConfirm = ({ puzzleIndex }: { puzzleIndex: number }) => {
  const { changePuzzle } = useSudoku();

  return (
    <Modal
      buttonTooltip="reset"
      buttonIcon={faArrowRotateLeft}
      title="Reset Puzzle"
      onConfirm={() => changePuzzle(puzzleIndex)}
      onCancel={() => {}}
      showCloseButton={false}
    >
      <p>Are you sure you want to reset the puzzle?</p>
    </Modal>
  );
};

const CheckSolution = () => {
  const { checkSolution } = useSudoku();

  return (
    <Modal
      buttonTooltip="check solution"
      buttonIcon={faCheck}
      title="Check Solution"
      onConfirm={() => checkSolution()}
      onCancel={() => {}}
      showCloseButton={false}
    >
      <p>Are you sure you want to check the solution?</p>
    </Modal>
  );
};

export default SudokuMenu;
