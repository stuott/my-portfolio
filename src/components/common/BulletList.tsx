const BulletList = ({ points }: { points: string[] }) => (
  <ul className="grid gap-2 py-2 list-disc list-inside">
    {points.map((point) => {
      const itemKey = "bullet_" + point.slice(0, 3).trim();
      return (
        <li key={itemKey} className="text-zinc-200">
          {point}
        </li>
      );
    })}
  </ul>
);

export default BulletList;
