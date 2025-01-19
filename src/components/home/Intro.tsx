import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowDown,
  faBook,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "components/common/Button";
import Link, { LinkProps } from "components/common/Link";
import LinkTable from "components/common/LinkTable";
import Section from "components/layout/Section";

const iconLinks: LinkProps[] = [
  {
    icon: faLinkedinIn,
    iconSize: "xl",
    to: "https://www.linkedin.com/in/stevencott/",
    hoverColor: "cyan-600",
    tooltip: "LinkedIn",
  },
  {
    icon: faGithubAlt,
    iconSize: "xl",
    to: "https://github.com/stuott",
    hoverColor: "cyan-600",
    tooltip: "Github",
  },
  {
    icon: faBook,
    iconSize: "xl",
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
    <Section id="intro" className="h-screen">
      <div className="flex flex-col gap-8 items-center justify-center my-auto">
        <h1 className="text-white text-4xl md:text-5xl">
          Hi, I'm <span className="text-cyan-500">Steven Ott</span>!
        </h1>
        <p className="text-white text-center text-2xl max-w-prose">
          I'm a developer who focuses on creating software solutions for
          clinicans at large scale health systems.
        </p>
        <LinkTable links={iconLinks} />
        <div className="flex flex-col gap-2 items-center">
          <Link
            icon={faFilePdf}
            hideIcon
            to={process.env.PUBLIC_URL + "/Resume.pdf"}
            className="text-xl text-white hover:text-cyan-600"
            scale
          >
            view my resume
          </Link>
          <p className="text-xl text-zinc-400">or</p>
          <IconButton
            icon={faArrowDown}
            className="text-xl text-white hover:text-cyan-600 p-0"
            onClick={scrollToContact}
            scale
          >
            contact me
          </IconButton>
        </div>
      </div>
    </Section>
  );
}
