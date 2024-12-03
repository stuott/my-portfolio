import { Section } from "components/layout";
import { LinkInfo } from "types/index";
import BulletList from "./BulletList";
import Link from "./Link";

interface ShowcaseProps {
  title: string;
  items: ShowcaseItemProps[];
}

const Showcase = ({ title, items }: ShowcaseProps) => {
  return (
    <Section id={title.toLowerCase()} title={title} className="">
      <div className="flex flex-col gap-6 justify-evenly">
        {items.map((item) => (
          <ShowcaseItem {...item} />
        ))}
      </div>
    </Section>
  );
};

interface ShowcaseItemProps {
  title: string;
  description: string;
  link?: LinkInfo;
  points?: string[];
}

const ShowcaseItem = ({
  title,
  description,
  link,
  points,
}: ShowcaseItemProps) => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 items-center p-6 border bg-zinc-800">
      <div className="sm:w-1/4">
        {link ? (
          <Link className="font-bold" {...link}>
            {title}
          </Link>
        ) : (
          <p className="font-bold">{title}</p>
        )}
      </div>
      <div className="sm:w-3/4">
        {description}
        {points ? <BulletList points={points} /> : <></>}
      </div>
    </div>
  );
};

export default Showcase;
