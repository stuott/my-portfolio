import { BulletList } from "@components/common";
import Link from "@components/common/Link";
import { Section } from "@components/layout";
import data from "@data/projects.json";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

interface project {
  title: string;
  link: {
    text?: string;
    to: string;
    internal?: boolean;
  };
  description: string;
  points: string[];
}

const Project = () => {
  const { index } = useParams();

  const projectData: project | undefined = data.projects.find(
    (project) => project.index === index
  );

  if (!projectData) {
    return <NotFound />;
  }

  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <Section>
        <div className="space-y-12">
          <Link
            className="text-xl italic"
            to="/projects"
            icon={faArrowLeft}
            hideIcon
            internal
          >
            project list
          </Link>
          <div className="flex flex-col items-center gap-12 p-16 border bg-zinc-700">
            <h1 className="text-5xl font-bold text-center">
              {projectData.title}
            </h1>
            <Link
              className="text-white text-2xl font-bold"
              {...projectData.link}
            >
              {projectData.link.text ?? "Try it out"}
            </Link>
            <div className="text-lg max-w-3xl">{projectData.description}</div>
            <BulletList points={projectData.points} />
          </div>
        </div>
      </Section>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="w-full bg-zinc-900/50 min-h-screen py-32 text-white">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-5xl font-bold">Sorry</h1>
        <h1 className="text-white text-2xl font-bold">
          We couldn't find that project.
        </h1>
        <Link className="text-2xl italic" internal to="/projects">
          back to the list of projects
        </Link>
      </div>
    </div>
  );
};

export default Project;
