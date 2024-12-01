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
  className?: string;
}

const Link = ({
  internal,
  scale,
  children,
  icon,
  disabled,
  className,
  hoverColor = "cyan-600",
  ...linkProps
}: LinkProps) => {
  const linkClasses = classNames(
    "flex gap-2 items-center w-fit transition hover:underline ",
    className,
    {
      [`hover:text-${hoverColor}`]: !disabled,
      "hover:scale-[1.02]": scale,
      "p-2": !children,
      "cursor-not-allowed text-zinc-500": disabled,
    }
  );

  return internal ? (
    <InternalLink
      {...linkProps}
      className={linkClasses}
      hideIcon
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} className="text-xl" />}
      {children}{" "}
      {children && <FontAwesomeIcon className="text-sm" icon={faLink} />}
    </InternalLink>
  ) : (
    <ExternalLink {...linkProps} className={linkClasses} disabled={disabled}>
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
  disabled,
}: LinkPropsInternal) => {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

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

const InternalLink = ({
  to,
  children,
  className,
  disabled,
}: LinkPropsInternal) => {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <NavLink title={to} to={to ?? ""} className={className}>
      {children}
    </NavLink>
  );
};

export default Link;
