import Timeline, { TimelineItem } from "@components/common/Timeline";
import Section from "@components/layout/Section";
import data from "@data/experience.json";

const Experience = () => {
  const dataItems: TimelineItem[] = data.experiences.map((experience) => {
    return {
      time: experience.time,
      title: experience.title + ", " + experience.company,
      subtitle: experience.location,
      link: experience.link,
      badges: experience.skills,
      points: experience.points,
      hidden: experience.hidden,
    };
  });

  return (
    <Section id="experience" title="Experience" className="bg-zinc-900">
      <Timeline items={dataItems}></Timeline>
    </Section>
  );
};

export default Experience;
