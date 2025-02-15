import { Link } from "@components/controls";
import { Section } from "@components/layout";
import data from "@data/projects.json";
import classNames from "classnames";
import { page } from "pages";

const Projects = () => {
  return (
    <>
      <Section title="Projects">
        <div className="grid sm:grid-cols-2 gap-6">
          {data.projects.length > 0 &&
            data.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </Section>
    </>
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

export const pageInfo: page = {
  path: "/projects/",
  name: "Projects",
  Component: Projects,
  showInNavbar: true,
  background: "bg-cube",
};
