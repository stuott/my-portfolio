import Badges from "@components/common/Badges";
import BulletList from "@components/common/BulletList";
import classNames from "classnames";
import { useEffect, useId, useState } from "react";
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
  hiddenPoints?: string[];
  hidden?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
  flipped?: boolean;
}
interface TimelineCardProps extends TimelineItem {
  flipped?: boolean;
  id?: number;
}

const Timeline = ({ items, flipped }: TimelineProps) => {
  const [showMore, setShowMore] = useState(false);
  const growDivID = useId();

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

  useEffect(() => {
    updateHiddenItems();
  }, [showMore]);

  const updateHiddenItems = () => {
    let growDiv = document.getElementById(growDivID);
    let hiddenHeight = 0;

    if (!growDiv?.children) {
      return;
    }

    if (showMore) {
      for (const child of growDiv?.children) {
        hiddenHeight += child.clientHeight;
      }
      growDiv.style.height = hiddenHeight + "px";
    } else {
      growDiv.style.height = "0px";
    }
  };

  addEventListener("resize", updateHiddenItems);

  const hiddenItemsClassnames = classNames(
    timelineClasses,
    "transition-all duration-1000 overflow-hidden ease-in-out h-0",
    {
      "bg-rose-800/20": !showMore,
      "bg-transparent ": showMore,
    }
  );

  return (
    <>
      <div className={timelineClasses}>
        {shownItems.map((item, index) => (
          <TimelineCard
            flipped={flipped}
            id={index}
            key={item.title}
            {...item}
          />
        ))}
      </div>
      <div id={growDivID} className={hiddenItemsClassnames}>
        {hiddenItems.map((item, index) => {
          return (
            <TimelineCard
              flipped={flipped}
              id={shownItems.length + index}
              key={item.title}
              {...item}
            />
          );
        })}
      </div>
      {hiddenItems.length > 0 && (
        <div className="flex justify-center py-4">
          <Button
            bg="rose-900"
            hoverBg="rose-700"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore
              ? "show less"
              : "show " +
                hiddenItems.length +
                " " +
                (shownItems.length > 0 ? "more " : "") +
                "items"}
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
  hiddenPoints,
  flipped,
  id,
  ...metaInfo
}: TimelineCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const growDivID = useId();

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

  useEffect(() => {
    updateHiddenPoints();
  }, [showMore]);

  const updateHiddenPoints = () => {
    let growDiv = document.getElementById(growDivID);
    let hiddenHeight = 0;

    if (!growDiv?.children) {
      return;
    }

    if (showMore) {
      for (const child of growDiv?.children) {
        hiddenHeight += child.clientHeight;
      }
      growDiv.style.height = hiddenHeight + "px";
    } else {
      growDiv.style.height = "0px";
    }
  };

  addEventListener("resize", updateHiddenPoints);

  const hiddenPointsClassnames = classNames(
    "transition-all duration-1000 overflow-hidden ease-in-out h-0",
    {
      "bg-rose-800/20": !showMore,
      "bg-transparent ": showMore,
    }
  );

  return (
    <div className={cardClasses}>
      {!flipped && <Time time={time} />}
      <div className={itemClasses}>
        <TimelineMeta {...metaInfo} />
        {badges && <Badges className="pt-2" captions={badges} />}
        {points && <BulletList points={points} color="zinc-400" />}
        {hiddenPoints && (
          <>
            <div id={growDivID} className={hiddenPointsClassnames}>
              <BulletList points={hiddenPoints} color="zinc-400" />
            </div>
            <Button
              className="bg-rose-900/30 hover:bg-rose-900/50"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore
                ? "see less about this experience"
                : "see more about this experience"}
            </Button>
          </>
        )}
      </div>
      {flipped && <Time time={time} />}
    </div>
  );
};

const Time = ({ time }: { time: string }) => {
  const timeClasses = classNames("py-4 sm:px-4 sm:w-1/4");

  return (
    <div className={timeClasses}>
      <p className="font-mono text-zinc-500 text-balance">
        {"{ " + time + " }"}
      </p>
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
