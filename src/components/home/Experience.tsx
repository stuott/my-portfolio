import Link from "components/common/Link";
import Timeline, { TimelineItem } from "components/common/Timeline";
import Section from "components/Layout/Section";
import experienceData from "data/experience.json";

export default function Experience() {
  const timelineItems: TimelineItem[] = experienceData.data.map(
    (experience) => {
      return {
        time: experience.time,
        title: experience.title + ", " + experience.company,
        subtitle: experience.location,
        URL: experience.companyURL,
        badges: experience.skills,
        points: experience.points,
      };
    }
  );

  return (
    <Section id="experience" title="Experience" className="bg-zinc-900">
      <Timeline items={timelineItems}></Timeline>
      <div className="flex justify-center">
        <Link
          text="View my resume"
          to={process.env.PUBLIC_URL + "/Resume.pdf"}
          className="w-fit my-10"
        />
      </div>
    </Section>
  );
}