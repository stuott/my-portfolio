import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import Intro, { About } from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
// import Projects from "./components/Projects";
import Quotes from "./components/Quotes";

function App() {
  return (
    <>
      <body className="mx-auto">
        <Navbar />
        <main className="mx-auto min-h-screen max-w-screen-lg py-24 px-6 md:px-12 lg:px-24">
          <Intro />
          <Quotes />
          <About />
          <Education />
          <Experience />
          <div className="pt-16 text-center">
            <a
              className="text-white p-6 bg-cyan-900 hover:bg-cyan-700 hover:underline"
              href={process.env.PUBLIC_URL + "/Resume.pdf"}
            >
              View my resume <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
          {/* <Projects /> */}
        </main>
        <Footer />
      </body>
    </>
  );
}

function Navbar() {
  return (
    <header className="mx-auto text-white bg-zinc-900 fixed top-0 w-full">
      <nav className="mx-auto px-2 py-2">
        <div className="flex justify-evenly">
          <NavbarLink text="About" link="#about" />
          <NavbarLink text="Education" link="#education" />
          <NavbarLink text="Experience" link="#experience" />
          {/* <NavbarLink text="Projects" link="#projects" /> */}
        </div>
      </nav>
    </header>
  );
}

function NavbarLink(props: { text: string; link: string }) {
  const { text, link } = props;
  return (
    <a className="text-lg px-4 py-2 transition hover:bg-cyan-700" href={link}>
      {text}
    </a>
  );
}

export function Footer() {
  return (
    <div className="w-full text-white p-4 bg-zinc-800">
      Check out the source code on{" "}
      <a
        className="underline text-cyan-400"
        href="https://github.com/stuott/my-portfolio"
      >
        GitHub
      </a>
    </div>
  );
}

export default App;
