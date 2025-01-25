import Badges from "@components/common/Badges";
import BulletList from "@components/common/BulletList";
import classNames from "classnames";
import { useState } from "react";
import Button from "./Button";
import Link, { LinkProps } from "./Link";

interface TimelineMetaInfo {
  title: string;
  subtitle?: string;
  link?: LinkProps;
}
export interface TimelineItem extends TimelineMetaInfo {
  time: string;
  badges?: string[];
  points?: string[];
  hidden?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  flipped?: boolean;
}
interface TimelineCardProps extends TimelineItem {
  flipped?: boolean;
}

const Timeline = ({ items, flipped }: TimelineProps) => {
  const [showMore, setShowMore] = useState(false);

  const shownItems: TimelineItem[] = [];
  const hiddenItems: TimelineItem[] = [];

  for (const item of items) {
    if (item.hidden) {
      hiddenItems.push(item);
    } else {
      shownItems.push(item);
    }
  }

  const timelineClasses = classNames(
    "grid divide-y border-y sm:divide-none sm:border-none"
  );

  const hiddenItemsClassnames = classNames(
    "transition-all duration-1000 overflow-hidden ease-in-out",
    {
      "bg-cyan-800/20 max-h-0": !showMore,
      "bg-transparent max-h-screen": showMore,
    }
  );

  return (
    <>
      <div className={timelineClasses}>
        {shownItems.map((item) => (
          <TimelineCard flipped={flipped} key={item.title} {...item} />
        ))}
      </div>
      <div className={hiddenItemsClassnames}>
        {hiddenItems.map((item) => (
          <TimelineCard flipped={flipped} key={item.title} {...item} />
        ))}
      </div>
      {hiddenItems.length > 0 && (
        <div className="flex justify-center py-4">
          <Button
            bg="cyan-900"
            hoverBg="cyan-700"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore
              ? "show less"
              : "show " + hiddenItems.length + " more items"}
          </Button>
        </div>
      )}
    </>
  );
};

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
