import { Link } from "@components/common";
import { Section } from "@components/layout";
import data from "@data/projects.json";
import classNames from "classnames";

const Projects = () => {
  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <Section title="Projects">
        <div className="grid sm:grid-cols-2 gap-6">
          {data.projects.length > 0 &&
            data.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </Section>
    </div>
  );
};

const ProjectCard = ({ project }: { project: any }) => {
  const cardClasses = classNames("text-white bg-zinc-800 border p-6 space-y-2");

  return (
    <div className={cardClasses}>
      <Link to={"/project/" + project.index} internal>
        <div>
          <h2 className="text-3xl font-bold">{project.title}</h2>
        </div>
      </Link>
      <p>{project.description}</p>
    </div>
  );
};

export default Projects;
