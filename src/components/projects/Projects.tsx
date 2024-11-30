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

interface Project {
  title: string;
  description: string;
  link?: LinkInfo;
  points?: string[];
}

const ProjectList = ({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) => {
  return (
    <Section
      id={title.toLowerCase()}
      title={title}
      className="px-6 md:px-12 lg:px-24"
    >
      <div className="flex flex-col gap-6 justify-evenly">
        {projects.map((project) => {
          return (
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-10 items-center">
              {project.link ? (
                <Link {...project.link}>{project.title}</Link>
              ) : (
                <p className="p-4 bg-cyan-800 w-fit">{project.title}</p>
              )}
              <div
                className="sm:w-3/4"
                style={{ textShadow: "1px 1px 10px black" }}
              >
                {project.description}
                {project.points ? (
                  <BulletList points={project.points} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
