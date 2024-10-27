import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "components/common/Section";
import Timeline, { TimelineItem } from "components/common/Timeline";
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
    <Section
      id="experience"
      title="Experience"
      className="py-10 px-6 md:px-12 lg:px-24 bg-zinc-900"
    >
      <Timeline items={timelineItems}></Timeline>
      <ResumeLink />
    </Section>
  );
}

function ResumeLink() {
  return (
    <div className="pt-8 text-center">
      <a
        className="text-white p-6 bg-cyan-900 hover:bg-cyan-700 hover:underline"
        href={process.env.PUBLIC_URL + "/Resume.pdf"}
      >
        View my resume <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
}
