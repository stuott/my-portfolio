import {
  faArrowUpRightFromSquare,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface LinkProps {
  to: string | undefined;
  text: string;
  internal?: boolean;
  className?: string;
}

const Link = ({ internal, ...linkProps }: LinkProps) => {
  return internal ? (
    <InternalLink {...linkProps} />
  ) : (
    <ExternalLink {...linkProps} />
  );
};

const getLinkClasses = (validLink: boolean) => {
  return classNames("p-4 bg-cyan-800 w-fit", {
    "transition hover:bg-cyan-700 hover:scale-[1.02] hover:underline":
      validLink,
    "pointer-events-none opacity-80": !validLink,
  });
};

const ExternalLink = ({ to, text, className }: LinkProps) => {
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

const InternalLink = ({ to, text, className }: LinkProps) => {
  return (
    <NavLink to={to ?? ""} className={getLinkClasses(!!to) + " " + className}>
      {text}{" "}
      {to ? <FontAwesomeIcon className="text-sm" icon={faLink} /> : <></>}
    </NavLink>
  );
};

export default Link;
