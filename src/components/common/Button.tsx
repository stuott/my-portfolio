import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ButtonInfo } from "types/index";

interface ButtonProps extends ButtonInfo {
  className?: string;
  bg?: string;
  hoverBg?: string;
  flipped?: boolean;
  scale?: boolean;
  disabled?: boolean;
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
}: ButtonProps) => {
  const buttonClasses = classNames(
    "flex gap-2 p-3 w-fit items-center",
    className,
    {
      [`bg-${bg}`]: bg,
      [`hover:bg-${hoverBg}`]: hoverBg && !disabled,
      "flex-row-reverse": flipped,
      "hover:scale-[1.05] transition duration-300": scale && !disabled,
      "cursor-not-allowed bg-zinc-800 text-zinc-600": disabled,
    }
  );

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {icon && <FontAwesomeIcon className={"text-xl"} icon={icon} />}
      {children}
    </button>
  );
};

export default Button;
