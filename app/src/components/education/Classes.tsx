import Section from "components/common/Section";
import Timeline, { TimelineItem } from "components/common/Timeline";
import educationData from "data/classes.json";

const Classes = () => {
  const timelineItems: TimelineItem[] = educationData.data.map((edu) => {
    return {
      time: edu.years,
      title: edu.grade,
      points: edu.classes,
      badges: edu.callouts,
    };
  });

  return (
    <Section>
      <Timeline items={timelineItems} flipped />
    </Section>
  );
};

export default Classes;
