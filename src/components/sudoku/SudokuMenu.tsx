import Checkbox from "@components/controls/Checkbox";
import {
  faArrowRotateLeft,
  faCheck,
  faGear,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

import Modal from "@components/controls/Modal";
import data from "@data/sudoku.json";
import { useEffect, useState } from "react";
import { useSudoku } from "./SudokuProvider";

interface SudokuSettings {
  showPreview?: boolean;
  makerMode?: boolean;
}

interface SudokuMenuProps {
  updateSettings: (settings: SudokuSettings) => void;
}

const SudokuMenu = ({ updateSettings }: SudokuMenuProps) => {
  const { sudoku, changePuzzle, setStartTime } = useSudoku();
  const [puzzle, setPuzzle] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sudoku.startTime !== null) {
        if (sudoku.solved && sudoku.endTime !== null) {
          clearInterval(interval);
          setElapsedTime(
            Math.floor((sudoku.endTime - sudoku.startTime) / 1000)
          );
        } else {
          setElapsedTime(Math.floor((Date.now() - sudoku.startTime) / 1000));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sudoku]);

  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="select-none">{formatElapsedTime(elapsedTime)}</p>
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
        {data.puzzles.map((puzzle, index) => {
          if (puzzle.name === "Maker") {
            return null;
          }
          return (
            <option key={index} value={index}>
              {puzzle.name}
            </option>
          );
        })}
      </select>
      <div className="grid grid-cols-2 gap-2">
        <HotkeyLegend />
        <Settings updateSettings={updateSettings} />
        <ResetConfirm puzzleIndex={puzzle} />
        <CheckSolution />
      </div>
    </div>
  );
};

const formatElapsedTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
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

interface SettingsProps {
  updateSettings: (settings: SudokuSettings) => void;
}

const Settings = ({ updateSettings }: SettingsProps) => {
  const { sudoku, showErrors, showSameValues, showHighlight } = useSudoku();

  const [showPreview, setShowPreview] = useState(false);
  const [makerMode, setMakerMode] = useState(false);

  const handleShowPreview = (value: boolean) => {
    setShowPreview(value);
    updateSettings({ showPreview: value });
  };

  const handleMakerMode = (value: boolean) => {
    setMakerMode(value);
    updateSettings({ makerMode: value });
  };

  return (
    <Modal buttonTooltip="settings" buttonIcon={faGear} title="Settings">
      <div className="space-y-3">
        <Checkbox
          label="check for sudoku errors"
          checked={sudoku.showErrors}
          onChange={(e) => showErrors(e.target.checked)}
        />
        <Checkbox
          label="highlight same value cells"
          checked={sudoku.showSameValue}
          onChange={(e) => showSameValues(e.target.checked)}
        />
        <Checkbox
          label="highlight same row/col/box"
          checked={sudoku.showHighlight}
          onChange={(e) => showHighlight(e.target.checked)}
        />
        <Checkbox
          label="show JSON data preview"
          checked={makerMode || showPreview}
          disabled={makerMode}
          onChange={(e) => handleShowPreview(e.target.checked)}
        />
        <Checkbox
          label="maker mode"
          checked={makerMode}
          onChange={(e) => handleMakerMode(e.target.checked)}
        />
      </div>
    </Modal>
  );
};

const ResetConfirm = ({ puzzleIndex }: { puzzleIndex: number }) => {
  const { changePuzzle, setStartTime, setEndTime } = useSudoku();

  const onConfirm = () => {
    changePuzzle(puzzleIndex);
    setStartTime(Date.now());
    setEndTime(null);
  };

  return (
    <Modal
      buttonTooltip="reset"
      buttonIcon={faArrowRotateLeft}
      title="Reset Puzzle"
      onConfirm={onConfirm}
      onCancel={() => {}}
      showCloseButton={false}
    >
      <p>Are you sure you want to reset the puzzle?</p>
    </Modal>
  );
};

const CheckSolution = () => {
  const { checkSolution, setEndTime } = useSudoku();

  const onConfirm = () => {
    checkSolution();
    setEndTime(Date.now());
  };

  return (
    <Modal
      buttonTooltip="check solution"
      buttonIcon={faCheck}
      title="Check Solution"
      onConfirm={onConfirm}
      onCancel={() => {}}
      showCloseButton={false}
    >
      <p>Are you sure you want to check the solution?</p>
    </Modal>
  );
};

export default SudokuMenu;
