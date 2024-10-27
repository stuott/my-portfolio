import About from "./About";
import Experience from "./Experience";
import Intro from "./Intro";
import Quotes from "./Quotes";

export default function Home() {
  return (
    <div className="py-[3.7rem]">
      <Intro />
      <About />
      <Quotes />
      <Experience />
    </div>
  );
}
