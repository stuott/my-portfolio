import Map from "components/common/Map";
import Classes from "./Classes";
import College from "./College";

export default function Education() {
  return (
    <div className="bg-zinc-900/50">
      <College />
      <Classes />
      <Map position={[47.121111, -88.569444]} marker="Houghton, MI" />
    </div>
  );
}
