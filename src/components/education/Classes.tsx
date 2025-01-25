import Timeline, { TimelineItem } from "@components/common/Timeline";
import Section from "@components/layout/Section";
import educationData from "@data/classes.json";

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
      className="bg-zinc-900"
      collapsable
      startCollapsed
    >
      <Timeline items={timelineItems} flipped />
    </Section>
  );
};

export default Classes;
