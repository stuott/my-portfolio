import classNames from "classnames";
import hash from "object-hash";

interface BulletListProps {
  points: string[];
  className?: string;
  color?: string;
}

const BulletList = ({ points, className, color }: BulletListProps) => {
  const bulletListClasses = classNames(
    "grid gap-2 list-disc list-inside",
    className,
    {
      [`text-${color}`]: color,
      "text-zinc-200": !color,
    }
  );

  return (
    <ul className={bulletListClasses}>
      {points.map((point, index) => {
        const itemKey = "bullet_" + hash(point) + index;
        return <li key={itemKey}>{point}</li>;
      })}
    </ul>
  );
};

export default BulletList;
