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
      <TimelineCard item={item} flipped={flipped ? true : false} />
    ))}
  </div>
);

interface TimelineCardProps {
  item: TimelineItem;
  flipped?: boolean;
}

const TimelineCard = ({ item, flipped }: TimelineCardProps) => (
  <div className="flex flex-col sm:flex-row sm:divide-x">
    {getTimeElement(item.time, true, flipped)}
    <div className="grid sm:w-3/4 pb-6 sm:pl-5">
      <TimelineMeta
        title={item.title}
        subtitle={item.subtitle}
        URL={item.URL}
      />
      {item.badges ? <Badges className="pt-2" captions={item.badges} /> : <></>}
      {item.points ? <BulletList points={item.points} /> : <></>}
    </div>
    {getTimeElement(item.time, false, flipped)}
  </div>
);

// Generate the time element based on the side that it's on
const getTimeElement = (time: string, right: boolean, flipped?: boolean) => {
  return (
    <div className={getTimeClasses(right, flipped)}>
      <p className="italic text-zinc-500">{time}</p>
    </div>
  );
};

// If we have a flipped timeline, we want to show the time on the right
// If the viewport is small, we want to show the time on the left again so it's above the content
const getTimeClasses = (left: boolean, flipped?: boolean) => {
  const baseClasses = "pt-4 pb-2 sm:w-1/4 sm:p-2";
  if (flipped) {
    return left ? `sm:hidden ${baseClasses}` : `hidden sm:block ${baseClasses}`;
  }
  return left ? baseClasses : `hidden ${baseClasses}`;
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
