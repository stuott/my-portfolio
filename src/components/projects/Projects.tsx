import BulletList from "components/common/BulletList";
import Link from "components/common/Link";
import Section from "components/layout/Section";
import data from "data/projects.json";
import { LinkInfo } from "types/index";

export default function Projects() {
  return (
    <div className="bg-zinc-900/50">
      <InProgress />
      <UpNext />
      <Complete />
    </div>
  );
}

const Complete = () => {
  return <ProjectList title="Complete" projects={data.complete} />;
};

const InProgress = () => {
  return <ProjectList title="In Progress" projects={data.in_progress} />;
};

const UpNext = () => {
  return <ProjectList title="Up Next" projects={data.up_next} />;
};

interface ProjectListProps {
  title: string;
  projects: ProjectProps[];
}

const ProjectList = ({ title, projects }: ProjectListProps) => {
  return (
    <Section id={title.toLowerCase()} title={title} className="">
      <div className="flex flex-col gap-6 justify-evenly">
        {projects.map((project) => (
          <Project {...project} />
        ))}
      </div>
    </Section>
  );
};

interface ProjectProps {
  title: string;
  description: string;
  link?: LinkInfo;
  points?: string[];
}

const Project = ({ title, description, link, points }: ProjectProps) => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 items-center p-6 border bg-zinc-800">
      <div className="sm:w-1/4">
        {link ? (
          <Link className="font-bold" {...link}>
            {title}
          </Link>
        ) : (
          <p className="font-bold">{title}</p>
        )}
      </div>
      <div className="sm:w-3/4">
        {description}
        {points ? <BulletList points={points} /> : <></>}
      </div>
    </div>
  );
};
