import { Section } from "@components/layout";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import BulletList from "./BulletList";
import Link, { LinkProps } from "./Link";

interface ShowcaseProps {
  title: string;
  items: ShowcaseItemProps[];
  minimal?: boolean;
}

const Showcase = ({ title, items, minimal }: ShowcaseProps) => {
  const displayClasses = classNames("gap-6", {
    "flex flex-col justify-evenly": !minimal,
    "grid grid-cols-2": minimal,
  });

  return (
    <Section id={title.toLowerCase()} title={title} className="">
      <div className={displayClasses}>
        {items.map((item) => (
          <ShowcaseItem {...item} minimal={minimal} />
        ))}
      </div>
    </Section>
  );
};

interface ShowcaseItemProps {
  title: string;
  icon?: IconDefinition;
  description: string;
  link?: LinkProps;
  points?: string[];
  minimal?: boolean;
}

const ShowcaseItem = ({
  title,
  description,
  icon,
  link,
  points,
  minimal,
}: ShowcaseItemProps) => {
  const linkClasses = classNames({
    "sm:w-1/4": !minimal,
  });

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 items-center p-6 border bg-zinc-800">
      {icon && (
        <FontAwesomeIcon icon={icon} size="2x" className="text-zinc-400" />
      )}
      <div className={linkClasses}>
        {link ? (
          <Link className="font-bold" {...link}>
            {title}
          </Link>
        ) : (
          <p className="font-bold">{title}</p>
        )}
      </div>
      {!minimal && (
        <div className="sm:w-3/4">
          {description}
          {points ? <BulletList points={points} /> : <></>}
        </div>
      )}
    </div>
  );
};

export default Showcase;
