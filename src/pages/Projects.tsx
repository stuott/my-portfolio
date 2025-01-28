import Showcase from "@components/common/Showcase";
import data from "@data/projects.json";

export default function Projects() {
  return (
    <div className="bg-zinc-900/50">
      <Showcase title="Projects" items={data.projects} />
    </div>
  );
}
