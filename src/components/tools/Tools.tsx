import Showcase from "components/common/Showcase";
import data from "data/tools.json";

const Tools = () => {
  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <Showcase minimal title="General" items={data.general} />
      <Showcase minimal title="Roleplaying" items={data.roleplaying} />
      <Showcase minimal title="Financial" items={data.financial} />
    </div>
  );
};

export default Tools;
