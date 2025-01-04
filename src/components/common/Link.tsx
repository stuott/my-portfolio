import {
  faArrowUpRightFromSquare as externalIcon,
  faLink as internalIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { LinkInfo } from "types/index";

export interface LinkProps extends LinkInfo {
  hoverColor?: string;
  disabled?: boolean;
  scale?: boolean;
  tooltip?: string;
  className?: string;
  hideIcon?: boolean;
}

const Link = ({
  internal,
  scale,
  children,
  icon,
  iconSize,
  disabled,
  className,
  hideIcon,
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

  const showIcon = children && !hideIcon;

  return internal ? (
    <InternalLink {...linkProps} className={linkClasses} disabled={disabled}>
      {icon && <FontAwesomeIcon icon={icon} size={iconSize} />}
      {children}{" "}
      {showIcon && <FontAwesomeIcon className="text-sm" icon={internalIcon} />}
    </InternalLink>
  ) : (
    <ExternalLink {...linkProps} className={linkClasses} disabled={disabled}>
      {icon && <FontAwesomeIcon icon={icon} size={iconSize} />}
      {children}
      {showIcon && <FontAwesomeIcon className="text-sm" icon={externalIcon} />}
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
  if (disabled || !to) {
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
