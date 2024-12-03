import Showcase from "components/common/Showcase";
import data from "data/tools.json";

const Tools = () => {
  return (
    <div className="bg-zinc-900/50">
      <Showcase title="Roleplaying" items={data.roleplaying} />
      <Showcase title="Financial" items={data.financial} />
    </div>
  );
};

export default Tools;
