import Link from "components/common/Link";
import Timeline, { TimelineItem } from "components/common/Timeline";
import Section from "components/layout/Section";
import data from "data/experience.json";

export default function Experience() {
  const timelineItems: TimelineItem[] = data.experiences.map((experience) => {
    return {
      time: experience.time,
      title: experience.title + ", " + experience.company,
      subtitle: experience.location,
      link: experience.link,
      badges: experience.skills,
      points: experience.points,
    };
  });

  return (
    <Section id="experience" title="Experience" className="bg-zinc-900">
      <Timeline items={timelineItems}></Timeline>
      <div className="flex justify-center">
        <Link to={process.env.PUBLIC_URL + "/Resume.pdf"}>View my resume</Link>
      </div>
    </Section>
  );
}
