import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "components/common/IconButton";
import IconTable from "components/common/IconTable";
import Section from "components/layout/Section";
import { Icon } from "types";

const icons: Icon[] = [
  {
    element: <FontAwesomeIcon icon={faLinkedinIn} />,
    url: "https://www.linkedin.com/in/stevencott/",
  },
  {
    element: <FontAwesomeIcon icon={faGithubAlt} />,
    url: "https://github.com/stuott",
  },
  {
    element: <FontAwesomeIcon icon={faBook} />,
    url: "https://app.thestorygraph.com/profile/stevenott",
  },
];

export default function Intro() {
  return (
    <Section id="intro" className="bg-zinc-900/30 py-10">
      <div className="flex justify-between items-center">
        <div
          className="grid gap-1"
          style={{ textShadow: "1px 1px 10px black" }}
        >
          <h1 className="text-white text-4xl md:text-5xl">Steven Ott</h1>
          <p className="text-gray-400">
            (920) 286-1509 - steven.ott.tech@gmail.com
          </p>
          <IconTable icons={icons} />
        </div>
        <div className="text-white">
          <IconButton
            icon={faArrowRight}
            className="text-xl text-zinc-400 hover:text-cyan-700 hover:scale-[1.05] transition duration-300"
            text="contact me"
            textSide="left"
            onClick={() => document.getElementById("contact")?.scrollIntoView()}
          />
        </div>
      </div>
    </Section>
  );
}
