import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Intro from "./Intro";
import Quotes from "./Quotes";

export default function Home() {
  return (
    <div>
      <Intro />
      <About />
      <Quotes />
      <Experience />
      <Contact />
    </div>
  );
}
