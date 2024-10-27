const BulletList = ({ points }: { points: string[] }) => (
  <ul className="grid gap-2 py-2 list-disc list-inside">
    {points.map((point) => {
      return <li className="text-zinc-400">{point}</li>;
    })}
  </ul>
);

export default BulletList;
