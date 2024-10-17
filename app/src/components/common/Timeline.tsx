import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badges from "components/common/Badges";

export interface TimelineItem {
  time: string;
  title: string;
  subtitle: string;
  URL: string;
  badges: string[];
  points: string[];
}

export default function Timeline(props: { items: TimelineItem[] }) {
  const { items } = props;

  return (
    <div className="grid divide-y border-y sm:divide-none sm:border-none">
      {items.map((item) => (
        <TimelineCard item={item} />
      ))}
    </div>
  );
}

function TimelineCard(props: { item: TimelineItem }) {
  const { item } = props;

  return (
    <div className="flex flex-col sm:flex-row sm:divide-x">
      <div className="pt-4 pb-2 sm:w-1/4 sm:p-2">
        <p className="italic text-zinc-500">{item.time}</p>
      </div>
      <div className="grid sm:w-3/4 pb-6 sm:pl-5">
        <TimelineMeta
          title={item.title}
          subtitle={item.subtitle}
          URL={item.URL}
        />
        {item.badges ? <Badges captions={item.badges} /> : <></>}
        {item.points ? <TimelinePoints points={item.points} /> : <></>}
      </div>
    </div>
  );
}

function TimelineMeta(props: { title: string; subtitle: string; URL: string }) {
  const { title, subtitle, URL } = props;

  return (
    <>
      {URL ? (
        <a
          className="transition hover:underline hover:text-cyan-300"
          href={URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title + " "}
          <FontAwesomeIcon
            className="text-sm"
            icon={faArrowUpRightFromSquare}
          />
        </a>
      ) : (
        <p>{title}</p>
      )}
      <p className="italic text-zinc-500">{subtitle}</p>
    </>
  );
}

function TimelinePoints(props: { points: string[] }) {
  const { points } = props;

  return (
    <ul className="grid gap-2 py-2 list-disc list-inside">
      {points.map((point) => {
        return <li className="text-zinc-400">{point}</li>;
      })}
    </ul>
  );
}
