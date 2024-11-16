import { faDice, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "components/common/IconButton";
import NumberInput from "components/common/NumberInput";
import { useState } from "react";

interface DiceRowData {
  id: string;
  quantity: number | undefined;
  sides: number | undefined;
  modifierPolarity: boolean;
  modifier: number | undefined;
}

interface RollResult {
  rolls: number[];
  total: number;
  modifier: number;
  modifierPolarity: boolean;
}

const rollDiceRow = (row: DiceRowData): RollResult => {
  const { quantity, sides, modifier, modifierPolarity } = row;
  const normal_mod = modifier ?? 0;

  if (!quantity) {
    return {
      rolls: [],
      total: normal_mod,
      modifier: normal_mod,
      modifierPolarity: modifierPolarity,
    };
  }

  let rolls = [];
  for (let i = 0; i < quantity; i++) {
    rolls.push(Math.floor(Math.random() * (sides ?? 1)) + 1);
  }

  const total = rolls.reduce((sum, roll) => sum + roll, 0);
  const finalTotal = modifierPolarity ? total + normal_mod : total - normal_mod;

  return {
    rolls: rolls,
    total: finalTotal,
    modifier: normal_mod,
    modifierPolarity: modifierPolarity,
  };
};

let nextId = 0;

interface DiceRowChangeArgs {
  index: number;
  field: "quantity" | "sides" | "modifier" | "modifierPolarity";
  value: number | string | boolean;
}

interface DiceRowProps {
  row: DiceRowData;
  index: number;
  handleChange: (props: DiceRowChangeArgs) => void;
  handleRemoveRow: (index: number) => void;
}

const DiceRow = ({
  row,
  index,
  handleChange,
  handleRemoveRow,
}: DiceRowProps) => {
  return (
    <div className="flex gap-2 items-center font-bold hover:bg-blue-900/20 p-2">
      <NumberInput
        value={row.quantity}
        onChange={(value) => handleChange({ index, field: "quantity", value })}
      />
      <p>d</p>
      <NumberInput
        value={row.sides}
        onChange={(value) => handleChange({ index, field: "sides", value })}
      />
      <NumberInput
        value={row.modifier}
        onChange={(value) => handleChange({ index, field: "modifier", value })}
        polarity={row.modifierPolarity}
        handlePolarity={(value) =>
          handleChange({ index, field: "modifierPolarity", value })
        }
      />
      <IconButton
        icon={faTrash}
        onClick={() => handleRemoveRow(index)}
        bgColor="rose-950"
        hoverColor="rose-900"
      />
    </div>
  );
};

const DiceRoller = () => {
  const [result, setResult] = useState<RollResult[] | null>(null);
  const [diceRows, setDiceRows] = useState<DiceRowData[]>([
    {
      id: (nextId++).toString(),
      quantity: undefined,
      sides: undefined,
      modifierPolarity: true,
      modifier: undefined,
    },
  ]);

  // Roll the dice rows and update the result
  const handleRoll = () => {
    const rowRollResults = diceRows.map(rollDiceRow);
    setResult(
      rowRollResults.filter((res) => res.rolls.length > 0 || res.modifier !== 0)
    );
  };

  // Add a new dice row when the add button is clicked
  const handleAddRow = () => {
    setDiceRows([
      ...diceRows,
      {
        id: (nextId++).toString(),
        quantity: undefined,
        sides: undefined,
        modifierPolarity: true,
        modifier: undefined,
      },
    ]);
  };

  // Remove a dice row when the trash icon is clicked
  const handleRemoveRow = (index: number) => {
    const newDiceRows = diceRows.filter((_, i) => i !== index);
    setDiceRows(newDiceRows); // Update dice rows
  };

  // Update dice row values when they are changed and reset the displayed result
  const handleChange = ({ index, field, value }: DiceRowChangeArgs) => {
    const newDiceRows = [...diceRows];
    if (field === "modifierPolarity") {
      newDiceRows[index].modifierPolarity = value as boolean;
    } else if (!Number.isNaN(Number(value))) {
      newDiceRows[index][field] = Number(value); // Update field
    }
    setDiceRows(newDiceRows); // Update dice rows
    setResult(null); // Reset result when changing dice values
  };

  // Calculate the total roll from the results if there are any
  const totalRoll = result?.reduce(
    (totalRoll, roll) => totalRoll + roll.total,
    0
  );

  return (
    <div className="text-white bg-zinc-800 p-5">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">
          Dice Roller <FontAwesomeIcon icon={faDice} />
        </h2>
        <div>
          {diceRows.map((row, index) => (
            <DiceRow
              key={row.id}
              row={row}
              index={index}
              handleChange={handleChange}
              handleRemoveRow={handleRemoveRow}
            />
          ))}
        </div>
        <div className="space-x-4">
          <IconButton
            icon={faPlus}
            onClick={handleAddRow}
            bgColor="green-900"
            hoverColor="green-800"
          />
          {diceRows?.length > 0 && (
            <IconButton
              icon={faDice}
              onClick={handleRoll}
              bgColor="cyan-900"
              hoverColor="cyan-800"
            />
          )}
        </div>
        {result && (
          <div className="text-xl mt-4 text-center">
            {result.map((res, index) => (
              <div key={index}>
                {res.rolls.length > 0 ? res.rolls.join(" + ") : 0}{" "}
                {res.modifierPolarity ? " + " : " - "} ({Math.abs(res.modifier)}
                ) = <strong>{res.total}</strong>
              </div>
            ))}
          </div>
        )}
        {result?.some((res) => res.rolls.length > 0) && (
          <p className="font-bold text-xl">
            {result
              ?.map((res) => {
                return res.total;
              })
              .join(" + ")}{" "}
            = {totalRoll}
          </p>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;
