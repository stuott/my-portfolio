import classNames from "classnames";
import Badges from "components/common/Badges";
import BulletList from "components/common/BulletList";
import { LinkInfo } from "types/index";
import Link from "./Link";

interface TimelineMetaInfo {
  title: string;
  subtitle?: string;
  link?: LinkInfo;
}
export interface TimelineItem extends TimelineMetaInfo {
  time: string;
  badges?: string[];
  points?: string[];
}

export interface TimelineProps {
  items: TimelineItem[];
  flipped?: boolean;
}
interface TimelineCardProps extends TimelineItem {
  flipped?: boolean;
}

const Timeline = ({ items, flipped }: TimelineProps) => (
  <div className="grid divide-y border-y sm:divide-none sm:border-none">
    {items.map((item) => (
      <TimelineCard flipped={flipped} {...item} key={item.title} />
    ))}
  </div>
);

const TimelineCard = ({
  time,
  badges,
  points,
  flipped,
  ...metaInfo
}: TimelineCardProps) => {
  const cardClasses = classNames("flex flex-col pl-4 sm:flex-row sm:divide-x", {
    "flex-col-reverse": flipped,
    "flex-col": !flipped,
  });

  const itemClasses = classNames(
    "grid sm:w-3/4 pl-4 mb-8 sm:pb-8 sm:mb-0 sm:px-5",
    {
      "border-l": !flipped,
    }
  );

  return (
    <div className={cardClasses}>
      {!flipped && <Time time={time} />}
      <div className={itemClasses}>
        <TimelineMeta {...metaInfo} />
        {badges && <Badges className="pt-2" captions={badges} />}
        {points ? <BulletList points={points} /> : <></>}
      </div>
      {flipped && <Time time={time} flipped />}
    </div>
  );
};

const Time = ({ time, flipped }: { time: string; flipped?: boolean }) => {
  const timeClasses = classNames("py-4 sm:px-4 sm:w-1/4", {
    "sm:text-end": !flipped,
  });

  return (
    <div className={timeClasses}>
      <p className="italic text-zinc-500">{time}</p>
    </div>
  );
};

const TimelineMeta = ({ title, subtitle, link }: TimelineMetaInfo) => {
  return (
    <>
      {link ? (
        <Link className="text-xl" {...link}>
          {title}
        </Link>
      ) : (
        <p className="text-xl">{title}</p>
      )}
      {subtitle && <p className="italic text-zinc-500 pt-2">{subtitle}</p>}
    </>
  );
};

export default Timeline;
