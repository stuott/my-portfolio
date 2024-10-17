import {
  faBook,
  faBriefcase,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsonData from "../data/about.json";
import { Section } from "./SectionUtils";

export default function Intro() {
  // const icons = [
  //   {
  //     text: "Madison, WI",
  //     icon: <FontAwesomeIcon icon={faLocationDot} />,
  //   },
  //   {
  //     text: "stevenott@charter.net",
  //     icon: <FontAwesomeIcon icon={faEnvelope} />,
  //   },
  //   {
  //     text: "(920) 286-1509",
  //     icon: <FontAwesomeIcon icon={faPhone} />,
  //   },
  // ];

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
//https://www.linkedin.com/in/stevencott/

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

export function About() {
  const data = jsonData.data;

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
