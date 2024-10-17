import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconTable from "components/common/IconTable";
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
