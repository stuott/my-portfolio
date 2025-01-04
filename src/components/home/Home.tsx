import Contact from "./Contact";
import Experience from "./Experience";
import Intro from "./Intro";

export default function Home() {
  return (
    <div className="bg-zinc-900/50">
      <Intro />
      <div className="flex flex-col xl:gap-10 xl:flex-row">
        <div className="xl:w-2/3">
          <Experience />
        </div>
        <div className="xl:w-1/3">
          <Contact />
        </div>
      </div>
    </div>
  );
}
