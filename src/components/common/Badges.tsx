import classNames from "classnames";

interface BadgesProps {
  captions: string[];
  className?: string;
  itemClassName?: string;
}

const Badges = ({ captions, className, itemClassName }: BadgesProps) => {
  const listClasses = classNames("flex flex-wrap gap-2", className);
  const itemClasses = classNames(
    "rounded-xl bg-cyan-900 py-1 px-2 text-sm",
    itemClassName
  );

  return (
    <ul className={listClasses}>
      {captions.map((caption) => {
        return <li className={itemClasses}>{caption}</li>;
      })}
    </ul>
  );
};

export default Badges;
