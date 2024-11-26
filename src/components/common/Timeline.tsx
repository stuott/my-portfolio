import classNames from "classnames";
import Badges from "components/common/Badges";
import BulletList from "components/common/BulletList";
import Link from "./Link";

export interface TimelineProps {
  items: TimelineItem[];
  flipped?: boolean;
}

const Timeline = ({ items, flipped }: TimelineProps) => (
  <div className="grid divide-y border-y sm:divide-none sm:border-none">
    {items.map((item) => (
      <TimelineCard item={item} flipped={flipped} />
    ))}
  </div>
);

interface TimelineCardProps {
  item: TimelineItem;
  flipped?: boolean;
}

const TimelineCard = ({ item, flipped }: TimelineCardProps) => (
  <div className="flex flex-col sm:flex-row sm:divide-x">
    {!flipped && getTimeElement(item.time, true)}
    <div className="grid sm:w-3/4 pb-12 sm:px-5">
      <TimelineMeta
        title={item.title}
        subtitle={item.subtitle}
        URL={item.URL}
      />
      {item.badges ? <Badges className="pt-2" captions={item.badges} /> : <></>}
      {item.points ? <BulletList points={item.points} /> : <></>}
    </div>
    {flipped && getTimeElement(item.time, false)}
  </div>
);

// Generate the time element based on the side that it's on
const getTimeElement = (time: string, right: boolean) => {
  const timeClasses = classNames("py-4 sm:px-4 sm:w-1/4", {
    "sm:text-end": right,
  });

  return (
    <div className={timeClasses}>
      <p className="italic text-zinc-500">{time}</p>
    </div>
  );
};

interface TimelineMetaInfo {
  title: string;
  subtitle?: string;
  URL?: string;
}

const TimelineMeta = ({ title, subtitle, URL }: TimelineMetaInfo) => {
  return (
    <>
      {URL ? (
        <Link text={title} to={URL} className="w-fit" />
      ) : (
        <p className="text-lg">{title}</p>
      )}
      {subtitle && <p className="italic text-zinc-500 pt-2">{subtitle}</p>}
    </>
  );
};

export interface TimelineItem extends TimelineMetaInfo {
  time: string;
  badges?: string[];
  points?: string[];
}

export default Timeline;
