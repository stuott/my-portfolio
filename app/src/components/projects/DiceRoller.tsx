export default function DiceRoller() {
  return (
    <div className="gap-3 text-white bg-zinc-800 p-5">
      <label className="text-sm">Quantity</label>
      <input className="bg-zinc-700 w-16" type="number" min={1} max={100} />
      <button className="transition p-4 bg-cyan-800 hover:bg-cyan-600">
        Roll
      </button>
    </div>
  );
}
