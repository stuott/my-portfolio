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

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView();
};

export default function Intro() {
  return (
    <Section id="intro" className="h-96">
      <div className="flex justify-between items-center my-auto">
        <div className="grid gap-1">
          <h1 className="text-white text-4xl md:text-5xl">Steven Ott</h1>
          <p className="text-gray-400">
            (920) 286-1509 - steven.ott.tech@gmail.com
          </p>
          <LinkTable links={iconLinks} />
        </div>
        <IconButton
          icon={faArrowRight}
          className="text-xl text-white hover:text-cyan-600"
          onClick={scrollToContact}
          flipped
          scale
        >
          contact me
        </IconButton>
      </div>
    </Section>
  );
}
