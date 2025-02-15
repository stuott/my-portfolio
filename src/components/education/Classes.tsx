import Timeline, { TimelineItem } from "@components/display/Timeline";
import Section from "@components/layout/Section";
import educationData from "@data/classes.json";

const Classes = () => {
  const timelineItems: TimelineItem[] = educationData.data.map((edu) => {
    return {
      time: edu.years,
      title: edu.grade,
      points: edu.classes,
      badges: edu.callouts,
      hidden: edu.hidden,
    };
  });

  return (
    <Section id="classes" title="Classes Taken" className="bg-zinc-900">
      <Timeline items={timelineItems} flipped />
    </Section>
  );
};

export default Classes;
