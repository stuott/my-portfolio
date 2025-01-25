import classNames from "classnames";

interface BulletListProps {
  points: string[];
  color?: string;
}

const BulletList = ({ points, color }: BulletListProps) => {
  const bulletListClasses = classNames(
    "grid gap-2 py-2 list-disc list-inside",
    {
      [`text-${color}`]: color,
      "text-zinc-200": !color,
    }
  );

  return (
    <ul className={bulletListClasses}>
      {points.map((point) => {
        const itemKey = "bullet_" + point.slice(0, 3).trim();
        return <li key={itemKey}>{point}</li>;
      })}
    </ul>
  );
};

export default BulletList;
