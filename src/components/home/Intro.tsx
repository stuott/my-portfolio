import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faBook } from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/Button";
import { LinkProps } from "components/common/Link";
import LinkTable from "components/common/LinkTable";
import Section from "components/layout/Section";

const iconLinks: LinkProps[] = [
  {
    icon: faLinkedinIn,
    to: "https://www.linkedin.com/in/stevencott/",
    hoverColor: "cyan-600",
    tooltip: "LinkedIn",
  },
  {
    icon: faGithubAlt,
    to: "https://github.com/stuott",
    hoverColor: "cyan-600",
    tooltip: "Github",
  },
  {
    icon: faBook,
    to: "https://app.thestorygraph.com/profile/stevenott",
    hoverColor: "cyan-600",
    tooltip: "Storygraph",
  },
];

export default function Intro() {
  return (
    <Section id="intro">
      <div className="flex justify-between items-center">
        <div
          className="grid gap-1"
          style={{ textShadow: "1px 1px 10px black" }}
        >
          <h1 className="text-white text-4xl md:text-5xl">Steven Ott</h1>
          <p className="text-gray-400">
            (920) 286-1509 - steven.ott.tech@gmail.com
          </p>
          <LinkTable links={iconLinks} />
        </div>
        <div className="text-white">
          <IconButton
            icon={faArrowRight}
            className="text-xl text-zinc-400 hover:text-cyan-700"
            onClick={() => document.getElementById("contact")?.scrollIntoView()}
            flipped
            scale
          >
            contact me
          </IconButton>
        </div>
      </div>
    </Section>
  );
}
