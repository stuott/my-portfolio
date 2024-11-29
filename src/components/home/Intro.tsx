import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faBook } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/IconButton";
import IconTable from "components/common/IconTable";
import Section from "components/layout/Section";

const iconLinks = [
  {
    icon: faLinkedinIn,
    url: "https://www.linkedin.com/in/stevencott/",
  },
  {
    icon: faGithubAlt,
    url: "https://github.com/stuott",
  },
  {
    icon: faBook,
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
          <IconTable links={iconLinks} />
        </div>
        <div className="text-white">
          <IconButton
            icon={faArrowRight}
            className="text-xl text-zinc-400 hover:text-cyan-700"
            text="contact me"
            onClick={() => document.getElementById("contact")?.scrollIntoView()}
            flipped
            scale
          />
        </div>
      </div>
    </Section>
  );
}
