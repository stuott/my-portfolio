import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export interface ButtonProps {
  className?: string;
  bg?: string;
  hoverBg?: string;
  flipped?: boolean;
  scale?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  iconSize?: string;
  onClick?: () => void;
  icon?: IconDefinition;
  children?: React.ReactNode;
  padding?: string;
  tooltip?: string;
}

const Button = ({
  onClick,
  icon,
  bg,
  hoverBg,
  children,
  className,
  flipped,
  scale,
  disabled,
  iconSize,
  padding,
  tooltip,
  type = "button",
}: ButtonProps) => {
  const paddingClass = padding ?? "p-2";
  const buttonClasses = classNames(
    "flex gap-2 w-fit items-center transition-all duration-300 cursor-pointer",
    bg,
    paddingClass,
    {
      [hoverBg ?? ""]: !disabled,
      "flex-row-reverse": flipped,
      "hover:scale-[1.05] transition duration-300": scale && !disabled,
      "cursor-not-allowed bg-zinc-800 text-zinc-600": disabled,
    },
    className
  );

  const iconClasses = classNames({
    [`text-${iconSize}`]: iconSize,
    "text-xl": !iconSize,
  });

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      title={tooltip}
    >
      {icon && <FontAwesomeIcon className={iconClasses} icon={icon} />}
      {children}
    </button>
  );
};

export default Button;
