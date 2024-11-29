import {
  faArrowUpRightFromSquare,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

interface linkProps {
  to: string | undefined;
  text: string;
  internal?: boolean;
  className?: string;
}

const Link = ({ to, text, internal, className }: linkProps) => {
  return internal ? (
    <InternalLink to={to} text={text} className={className} />
  ) : (
    <ExternalLink to={to} text={text} className={className} />
  );
};

const getLinkClasses = (validLink: boolean) => {
  return (
    "p-4 bg-cyan-800 w-fit" +
    (validLink
      ? " transition hover:bg-cyan-700 hover:scale-[1.02] hover:underline"
      : " pointer-events-none opacity-80")
  );
};

const ExternalLink = ({ to, text, className }: linkProps) => {
  return (
    <a
      className={getLinkClasses(!!to) + " " + className}
      href={to ?? ""}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}{" "}
      {to ? (
        <FontAwesomeIcon className="text-sm" icon={faArrowUpRightFromSquare} />
      ) : (
        <></>
      )}
    </a>
  );
};

const InternalLink = ({ to, text, className }: linkProps) => {
  return (
    <NavLink to={to ?? ""} className={getLinkClasses(!!to) + " " + className}>
      {text}{" "}
      {to ? <FontAwesomeIcon className="text-sm" icon={faLink} /> : <></>}
    </NavLink>
  );
};

export default Link;
