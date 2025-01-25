import Showcase from "@components/common/Showcase";
import data from "@data/projects.json";

export default function Projects() {
  return (
    <div className="bg-zinc-900/50">
      <Showcase title="In Progress" items={data.in_progress} />
      <Showcase title="Up Next" items={data.up_next} />
      <Showcase title="Complete" items={data.complete} />
    </div>
  );
}
