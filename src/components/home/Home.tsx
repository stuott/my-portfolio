import Contact from "./Contact";
import Experience from "./Experience";
import Intro from "./Intro";

export default function Home() {
  return (
    <div className="bg-zinc-900/50">
      <Intro />
      <Experience />
      <Contact />
    </div>
  );
}
