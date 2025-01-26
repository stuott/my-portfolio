import { Classes, College } from "@components/education";

export default function Education() {
  return (
    <div className="bg-zinc-900/50 min-h-screen pb-10">
      <College />
      <Classes />
    </div>
  );
}
