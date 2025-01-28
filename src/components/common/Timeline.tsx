import Badges from "@components/common/Badges";
import BulletList from "@components/common/BulletList";
import classNames from "classnames";
import Collapsible from "./Collapsible";
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

  const moreText = shownItems.length > 0 ? " more " : " ";
  const buttonText = "show " + hiddenItems.length + moreText + "items";

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
      <Collapsible
        buttonBelow
        buttonCenter
        buttonClasses="my-4"
        buttonTextClosed={buttonText}
      >
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
      </Collapsible>
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
  const cardClasses = classNames("flex flex-col pl-4 sm:flex-row sm:divide-x", {
    "flex-col-reverse": flipped,
    "flex-col": !flipped,
  });

  const itemClasses = classNames(
    "grid sm:w-3/4 pl-4 gap-2 mb-8 sm:pb-8 sm:mb-0 sm:px-5",
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
        {points && <BulletList points={points} color="zinc-400" />}
        {hiddenPoints && (
          <Collapsible
            buttonBelow
            buttonTextClosed="see more about this experience"
            buttonTextExpanded="see less about this experience"
          >
            <BulletList points={hiddenPoints} color="zinc-400" />
          </Collapsible>
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
    <div>
      {link ? (
        <Link className="text-xl" {...link}>
          {title}
        </Link>
      ) : (
        <p className="text-xl">{title}</p>
      )}
      {subtitle && <p className="italic text-zinc-500 pt-2">{subtitle}</p>}
    </div>
  );
};

export default Timeline;
