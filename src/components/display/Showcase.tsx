import { Section } from "@components/layout";
import Collapsible from "@components/layout/Collapsible";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link, { LinkProps } from "../controls/Link";
import BulletList from "./BulletList";

interface ShowcaseProps {
  title: string;
  items: ShowcaseItemProps[];
}

const Showcase = ({ title, items }: ShowcaseProps) => {
  return (
    <Section id={title.toLowerCase()} title={title} className="">
      <div className="grid sm:grid-cols-2 justify-evenly gap-6">
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
      <div className="text-balance text-center">
        <span className="text-2xl">{title}</span>
        {link && <Link {...link}></Link>}
      </div>
      {(description || points) && (
        <Collapsible>
          <ItemInfo description={description} points={points} />
        </Collapsible>
      )}
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
