import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare as externalIcon,
  IconDefinition,
  faLink as internalIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

export interface LinkProps {
  to: string;
  disabled?: boolean;
  scale?: boolean;
  tooltip?: string;
  className?: string;
  hideIcon?: boolean;
  icon?: IconDefinition;
  iconSize?: SizeProp;
  internal?: boolean;
  noUnderline?: boolean;
  noColor?: boolean;
  children?: React.ReactNode;
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
  noUnderline,
  noColor,
  ...linkProps
}: LinkProps) => {
  console.log(scale); // Debugging log

  const linkClasses = classNames(
    "flex gap-2 items-center w-fit transition",
    className,
    {
      "hover:underline": !disabled && !noUnderline,
      "hover:text-rose-600": !disabled && !noColor,
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

const ExternalLink = ({
  tooltip,
  to,
  children,
  className,
  disabled,
}: LinkProps) => {
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

const InternalLink = ({ to, children, className, disabled }: LinkProps) => {
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
