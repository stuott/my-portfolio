import {
  faCalendarMinus,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/common";
import Timeline, { TimelineItem } from "components/common/Timeline";
import Section from "components/layout/Section";
import data from "data/experience.json";
import { useState } from "react";

const Experience = () => {
  const dataItems: TimelineItem[] = data.experiences.map((experience) => {
    return {
      time: experience.time,
      title: experience.title + ", " + experience.company,
      subtitle: experience.location,
      link: experience.link,
      badges: experience.skills,
      points: experience.points,
    };
  });

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(
    dataItems.slice(0, 2)
  );

  const [showMore, setShowMore] = useState(false);

  const onClick = () => {
    setTimelineItems(showMore ? dataItems.splice(0, 2) : dataItems);
    setShowMore(!showMore);
  };

  return (
    <Section id="experience" title="Experience" className="bg-zinc-900">
      <Timeline items={timelineItems}></Timeline>
      <Button
        onClick={onClick}
        className="my-4 mx-auto"
        bg="cyan-800"
        hoverBg="cyan-600"
        icon={showMore ? faCalendarMinus : faCalendarPlus}
      >
        {showMore ? "see less" : "see more"}
      </Button>
    </Section>
  );
};

export default Experience;
