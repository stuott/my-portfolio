import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface DiceRow {
  quantity: number | undefined;
  sides: number | undefined;
  modifier: number | undefined;
}

interface RollResult {
  rolls: number[];
  total: number;
  modifier: number;
}

const rollDice = (sides: number, quantity: number) => {
  if (sides === undefined || quantity === undefined) {
    return { rolls: [], total: 0 };
  }

  let rolls = [];
  for (let i = 0; i < quantity; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  const total = rolls.reduce((acc, roll) => acc + roll, 0);
  return { rolls, total };
};

const DiceRoller = () => {
  const [result, setResult] = useState<RollResult[] | null>(null);
  const [diceRows, setDiceRows] = useState<DiceRow[]>([
    { quantity: undefined, sides: undefined, modifier: undefined },
  ]);

  const handleRoll = () => {
    const allResults = diceRows.map(({ quantity, sides, modifier }) => {
      if (!sides || !quantity) {
        return { rolls: [], total: 0, modifier: 0 };
      }

      const result = rollDice(sides ? sides : 0, quantity ? quantity : 0);

      return {
        rolls: result.rolls,
        total: result.total + (modifier ? modifier : 0),
        modifier: modifier ? modifier : 0,
      };
    });
    setResult(allResults.filter((result) => result.rolls.length > 0));
  };

  const handleAddRow = () => {
    setDiceRows([
      ...diceRows,
      { quantity: undefined, sides: undefined, modifier: undefined },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const newDiceRows = diceRows.filter((_, i) => i !== index);
    setDiceRows(newDiceRows);
  };

  const handleChange = (
    index: number,
    field: "quantity" | "sides" | "modifier",
    value: number | string
  ) => {
    const newDiceRows = [...diceRows];
    newDiceRows[index][field] = value === "" ? 0 : Number(value);
    setDiceRows(newDiceRows);
  };

  const numberClasses = "bg-zinc-900 text-white p-2 w-16 flex-grow";

  let totalRoll = result?.reduce(
    (totalRoll, roll) => totalRoll + roll.total,
    0
  );

  return (
    <div className="gap-3 text-white bg-zinc-800 p-5">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Dice Roller</h2>
        {diceRows.map((row, index) => (
          <div key={index} className="flex gap-2 items-center font-bold">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={row.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              className={numberClasses}
              min={1}
            />
            <p>d</p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={row.sides}
              onChange={(e) => handleChange(index, "sides", e.target.value)}
              className={numberClasses}
              min={1}
            />
            <p>mod</p>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={row.modifier}
              onChange={(e) => handleChange(index, "modifier", e.target.value)}
              className={numberClasses}
            />
            {diceRows.length > 1 && (
              <button
                className="text-sm bg-rose-950 hover:bg-rose-900 text-white p-2 rounded"
                onClick={() => handleRemoveRow(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        ))}
        <button
          className="text-sm bg-green-900 hover:bg-green-800 text-white p-2 rounded"
          onClick={handleAddRow}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="bg-cyan-900 hover:bg-cyan-800 text-white py-2 px-4 rounded"
          onClick={handleRoll}
        >
          Roll
        </button>
        {result && (
          <div className="text-xl mt-4 text-center">
            {result.map((res, index) => (
              <div key={index}>
                {res.rolls.join(" + ")} {res.modifier >= 0 ? " + " : " - "} (
                {Math.abs(res.modifier)}) = <strong>{res.total}</strong>
              </div>
            ))}
          </div>
        )}
        {totalRoll && (
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
