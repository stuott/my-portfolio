import {
  faArrowUpRightFromSquare,
  faLink,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { LinkInfo } from "types/index";

export interface LinkProps extends LinkInfo {
  hoverColor?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: IconDefinition;
  scale?: boolean;
  tooltip?: string;
}

const Link = ({
  internal,
  scale,
  children,
  icon,
  disabled,
  hoverColor = "cyan-600",
  ...linkProps
}: LinkProps) => {
  const linkClasses = classNames(
    "flex gap-2 items-center w-fit transition hover:underline ",
    {
      [`hover:text-${hoverColor}`]: !disabled,
      "hover:scale-[1.02]": scale,
      "p-2": !children,
      "pointer-events-none text-zinc-500": disabled,
    }
  );

  return internal ? (
    <InternalLink {...linkProps} className={linkClasses} hideIcon>
      {icon && <FontAwesomeIcon icon={icon} className="text-xl" />}
      {children}{" "}
      {children && <FontAwesomeIcon className="text-sm" icon={faLink} />}
    </InternalLink>
  ) : (
    <ExternalLink {...linkProps} className={linkClasses}>
      {icon && <FontAwesomeIcon icon={icon} className="text-xl" />}
      {children}
      {children && (
        <FontAwesomeIcon className="text-sm" icon={faArrowUpRightFromSquare} />
      )}
    </ExternalLink>
  );
};

interface LinkPropsInternal extends LinkProps {
  hideIcon?: boolean;
  className?: string;
}

const ExternalLink = ({
  tooltip,
  to,
  children,
  className,
}: LinkPropsInternal) => {
  return (
    <a
      title={tooltip ?? to}
      className={className}
      href={to ?? ""}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

const InternalLink = ({ to, children, className }: LinkPropsInternal) => {
  return (
    <NavLink title={to} to={to ?? ""} className={className}>
      {children}
    </NavLink>
  );
};

export default Link;
