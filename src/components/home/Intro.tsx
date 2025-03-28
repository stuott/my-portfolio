import { Button, LinkTable } from "@components/controls";
import Link, { LinkProps } from "@components/controls/Link";
import Section from "@components/layout/Section";
import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowDown,
  faBook,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

const iconLinks: LinkProps[] = [
  {
    icon: faLinkedinIn,
    iconSize: "xl",
    to: "https://www.linkedin.com/in/stevencott/",
    tooltip: "LinkedIn",
  },
  {
    icon: faGithubAlt,
    iconSize: "xl",
    to: "https://github.com/stuott",
    tooltip: "Github",
  },
  {
    icon: faBook,
    iconSize: "xl",
    to: "https://app.thestorygraph.com/profile/stevenott",
    tooltip: "Storygraph",
  },
];

export default function Intro() {
  return (
    <Section id="intro" className="h-screen">
      <div className="flex flex-col gap-8 items-center text-center justify-center h-full">
        <h1 className="text-white text-4xl md:text-5xl text-balance ">
          Hi, I'm <span className="text-rose-500">Steven Ott</span>!
        </h1>
        <p className="text-white text-2xl max-w-prose">
          I'm a developer who focuses on creating software solutions for
          clinicans at large scale health systems.
        </p>
        <LinkTable links={iconLinks} />
        <CallToAction />
      </div>
    </Section>
  );
}

const CallToAction = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView();
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <Link
        icon={faFilePdf}
        hideIcon
        to={"/Resume.pdf"}
        className="text-xl text-white hover:text-rose-600"
        scale
      >
        view my resume
      </Link>
      <p className="text-xl text-zinc-400">or</p>
      <Button
        icon={faArrowDown}
        className="text-xl text-white hover:text-rose-600 p-0"
        onClick={scrollToContact}
        scale
      >
        contact me
      </Button>
    </div>
  );
};
