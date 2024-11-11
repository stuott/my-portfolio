import Section from "components/Layout/Section";
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
    <Section
      id="classes"
      title="Classes Taken"
      className="bg-zinc-900 px-6 md:px-12 lg:px-24"
    >
      <Timeline items={timelineItems} flipped />
    </Section>
  );
};

export default Classes;
