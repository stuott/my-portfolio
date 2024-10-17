import Section from "components/common/Section";

export default function Projects() {
  const projects = [
    { title: "F1 Dashboard", description: "" },
    { title: "Task Queue", description: "" },
  ];

  return (
    <Section id="projects" title="Projects">
      <div className="flex p-4 justify-evenly">
        {projects.map((project, index) => {
          return (
            <button
              className={
                "transition p-4 hover:bg-cyan-600 hover:scale-[1.05] bg-cyan-800"
              }
            >
              {project.title}
            </button>
          );
        })}
      </div>
    </Section>
  );
}
