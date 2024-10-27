import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BulletList from "components/common/BulletList";
import Section from "components/common/Section";

export default function Projects() {
  return (
    <div className="py-12 bg-zinc-900/50">
      <Complete />
      <InProgress />
      <UpNext />
    </div>
  );
}

const Complete = () => {
  const projects = [
    {
      title: "Cost-Effective Pick Point System",
      URL: "https://youtu.be/5CnoxZWs00k?si=rgVU8ebNp2aKR4Nv&t=232",
      description: "An enterprise team projects partnered with General Motors",
      points: [
        "Worked with a team of engineering student peers to create a system to grab and sort objects in 3D space using a 6-axis robotic arm, machine learning, and an array of cameras",
        "Researched and selected a depth camera based on system constraints including the size of the workspace and necessary depth accuracy",
        "Implemented height detection and end effector manipulation in Python using provided packages",
      ],
    },
  ];

  return <ProjectList title="Complete" projects={projects} />;
};

const InProgress = () => {
  const projects = [
    {
      title: "MTU Triangle Website Revamp",
      URL: "https://mtutriangle.org/",
      description:
        "A website revamp for the Michigan Tech chapter of Triangle Fraternity",
      points: [
        "Redesigning the website to be more modern and user-friendly",
        "Targeting specific user personas (prospective members, community members, alumni)",
      ],
    },
  ];

  return <ProjectList title="In Progress" projects={projects} />;
};

const UpNext = () => {
  const projects = [
    {
      title: "F1 Dashboard",
      description:
        "A dashboard that shows stats for drivers in real-time during an F1 event",
      points: ["Real-time data", "Driver comparison"],
    },
  ];

  return <ProjectList title="Up Next" projects={projects} />;
};

interface Project {
  title: string;
  description: string;
  URL?: string;
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
              <a
                className={
                  "p-4 bg-cyan-800 sm:w-1/4" +
                  (project.URL
                    ? " transition hover:bg-cyan-700 hover:scale-[1.02] hover:underline"
                    : "")
                }
                href={project.URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.title}{" "}
                {project.URL ? (
                  <FontAwesomeIcon
                    className="text-sm"
                    icon={faArrowUpRightFromSquare}
                  />
                ) : (
                  <></>
                )}
              </a>
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
