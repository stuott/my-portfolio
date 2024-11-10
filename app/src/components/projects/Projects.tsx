import BulletList from "components/common/BulletList";
import Link from "components/common/Link";
import Section from "components/common/Section";

export default function Projects() {
  return (
    <div className="bg-zinc-900/50">
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
      description: "An enterprise team project partnered with General Motors",
      points: [
        "Worked with a team of engineering student peers to create a system to grab and sort objects in 3D space using a 6-axis robotic arm, machine learning, and an array of cameras",
        "Researched and selected a depth camera based on system constraints including the size of the workspace and necessary depth accuracy",
        "Implemented height detection and end effector manipulation in Python using provided packages",
      ],
    },
    {
      title: "Recipe List",
      URL: "/projects/recipe-list",
      internal: true,
      description:
        "A Typescript and React based list of recipes that I have curated",
      points: [
        "Using React to create a list of recipes with search and filter functionality",
        "Creating a recipe card component to display each recipe",
        "Using Tailwind CSS to style the page",
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
  internal?: boolean;
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
              <Link
                to={project.URL}
                text={project.title}
                internal={project.internal}
                className="sm:w-1/4"
              />
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
