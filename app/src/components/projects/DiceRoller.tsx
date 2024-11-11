import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const rollDice = (sides: number, quantity: number) => {
  let rolls = [];
  for (let i = 0; i < quantity; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  const total = rolls.reduce((acc, roll) => acc + roll, 0);
  return { rolls, total };
};

const DiceRoller = () => {
  const [result, setResult] = useState<
    { rolls: number[]; total: number; modifier: number }[] | null
  >(null);
  const [diceRows, setDiceRows] = useState([
    { quantity: 1, sides: 6, modifier: 0 },
  ]);

  const handleRoll = () => {
    const allResults = diceRows.map(({ quantity, sides, modifier }) => {
      const result = rollDice(sides, quantity);
      return { ...result, total: result.total + modifier, modifier: modifier };
    });
    setResult(allResults);
  };

  const handleAddRow = () => {
    setDiceRows([...diceRows, { quantity: 1, sides: 6, modifier: 0 }]);
  };

  const handleRemoveRow = (index: number) => {
    const newDiceRows = diceRows.filter((_, i) => i !== index);
    setDiceRows(newDiceRows);
  };

  const handleChange = (
    index: number,
    field: "quantity" | "sides" | "modifier",
    value: number
  ) => {
    const newDiceRows = [...diceRows];
    newDiceRows[index][field] = value;
    setDiceRows(newDiceRows);
  };

  const numberClasses = "bg-zinc-900 text-white p-2 w-16 appearance-none";

  let totalRoll = result?.reduce(
    (totalRoll, roll) => totalRoll + roll.total,
    0
  );

  return (
    <div className="gap-3 text-white bg-zinc-800 p-5">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4 font-bold">Dice Roller</h2>
        {diceRows.map((row, index) => (
          <div key={index} className="flex gap-4 mb-4 items-center font-bold">
            <input
              type="number"
              value={row.quantity}
              onChange={(e) =>
                handleChange(index, "quantity", Number(e.target.value))
              }
              placeholder="Quantity"
              className={numberClasses}
              min={1}
            />
            <p>d</p>
            <input
              type="number"
              value={row.sides}
              onChange={(e) =>
                handleChange(index, "sides", Number(e.target.value))
              }
              placeholder="Sides"
              className={numberClasses}
              min={1}
            />
            <p>mod</p>
            <input
              type="number"
              value={row.modifier}
              onChange={(e) =>
                handleChange(index, "modifier", Number(e.target.value))
              }
              placeholder="Modifier"
              className={numberClasses}
            />
            <button
              className="bg-rose-950 hover:bg-rose-900 text-white py-2 px-4 rounded"
              onClick={() => handleRemoveRow(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <div className="space-x-4">
          <button
            className="bg-green-900 hover:bg-green-800 text-white py-2 px-4 rounded mb-4"
            onClick={handleAddRow}
          >
            Add Row
          </button>
          <button
            className="bg-cyan-900 hover:bg-cyan-800 text-white py-2 px-4 rounded"
            onClick={handleRoll}
          >
            Roll
          </button>
        </div>
        {result !== null && (
          <div className="text-xl mt-4">
            {result.map((res, index) => (
              <div key={index}>
                Row {index + 1}: {res.rolls.join(" + ")}{" "}
                {res.modifier >= 0 ? " + " : " - "} ({Math.abs(res.modifier)})
              </div>
            ))}
          </div>
        )}
        <p className="font-bold text-xl">= {totalRoll}</p>
      </div>
    </div>
  );
};

export default DiceRoller;
