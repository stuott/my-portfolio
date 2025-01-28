import { Section } from "@components/layout";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BulletList from "./BulletList";
import Collapsible from "./Collapsible";
import Link, { LinkProps } from "./Link";

interface ShowcaseProps {
  title: string;
  items: ShowcaseItemProps[];
}

const Showcase = ({ title, items }: ShowcaseProps) => {
  return (
    <Section id={title.toLowerCase()} title={title} className="">
      <div className="flex flex-col justify-evenly gap-6">
        {items.map((item) => (
          <ShowcaseItem {...item} />
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
}

const ShowcaseItem = ({
  title,
  description,
  icon,
  link,
  points,
}: ShowcaseItemProps) => {
  return (
    <div className="flex flex-col gap-6 items-center p-6 border bg-zinc-800">
      {icon && (
        <FontAwesomeIcon icon={icon} size="2x" className="text-zinc-400" />
      )}
      <div>
        {link ? (
          <Link className="font-bold" {...link}>
            <span className="text-2xl">{title}</span>
          </Link>
        ) : (
          <p className="font-bold">{title}</p>
        )}
      </div>
      <Collapsible>
        <ItemInfo description={description} points={points} />
      </Collapsible>
    </div>
  );
};

const ItemInfo = ({
  description,
  points,
}: {
  description: string;
  points?: string[];
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">description</h2>
      <p className="pl-4">{description}</p>
      <h2 className="text-lg font-bold">key topics/skills</h2>
      <p className="pl-4">{points && <BulletList points={points} />}</p>
    </div>
  );
};

export default Showcase;
