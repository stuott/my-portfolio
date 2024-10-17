import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Intro from "./Intro";
import Quotes from "./Quotes";

export default function Home() {
  return (
    <>
      <Intro />
      <About />
      <Quotes />
      <Experience />
      <Education />
    </>
  );
}
