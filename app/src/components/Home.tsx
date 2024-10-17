import {
  faArrowUpRightFromSquare,
  faBook,
  faBriefcase,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import aboutData from "../data/about.json";
import quotesData from "../data/quotes.json";
import Education from "./Education";
import Experience from "./Experience";
import { Section } from "./SectionUtils";

export default function Home() {
  return (
    <>
      <Intro />
      <Quotes />
      <About />
      <ResumeLink />
      <Education />
      <Experience />
    </>
  );
}

function Intro() {
  const icons = [
    {
      element: <FontAwesomeIcon icon={faBriefcase} />,
      url: "https://www.linkedin.com/in/stevencott/",
    },
    {
      element: <FontAwesomeIcon icon={faCodeBranch} />,
      url: "https://github.com/stuott",
    },
    {
      element: <FontAwesomeIcon icon={faBook} />,
      url: "https://app.thestorygraph.com/profile/stevenott",
    },
  ];

  return (
    <div className="grid gap-1">
      <h1 className="text-white text-4xl md:text-5xl">Steven Ott</h1>
      <p className="text-xl text-gray-400">Software Developer</p>
      <p className="text-gray-400">
        (920) 286-1509 - steven.ott.tech@gmail.com
      </p>
      <IconTable icons={icons} />
    </div>
  );
}

interface iconTableProps {
  icons: { element: JSX.Element; url: string }[];
}

function IconTable(props: iconTableProps) {
  const { icons } = props;

  return (
    <div className="flex text-white text-xl gap-3">
      {icons.map((icon) => {
        return (
          <a href={icon.url} aria-label="link">
            {icon.element}
          </a>
        );
      })}
    </div>
  );
}

function Quotes() {
  const data = quotesData.data;
  const date = new Date(Date.now());
  const quote = data[date.getDay() % data.length];

  return (
    <Section id="meditation">
      <div className="text-center text-lg text-zinc-400 text-balance">
        <blockquote>"{quote.text}"</blockquote>
        <p className="text-sm"> - {quote.author}</p>
      </div>
    </Section>
  );
}

export function About() {
  const data = aboutData.data;

  return (
    <Section id="about" title="About">
      <div className="grid gap-3">
        {data.map((paragraph) => {
          return <p className="">{paragraph.join(". ") + "."}</p>;
        })}
      </div>
    </Section>
  );
}

function ResumeLink() {
  return (
    <div className="pt-16 text-center">
      <a
        className="text-white p-6 bg-cyan-900 hover:bg-cyan-700 hover:underline"
        href={process.env.PUBLIC_URL + "/Resume.pdf"}
      >
        View my resume <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
}
