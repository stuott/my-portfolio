import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface IconButtonProps {
  icon: IconDefinition;
  text?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  bgColor?: string;
  hoverColor?: string;
  textSide?: "left" | "right" | "";
}

const IconButton = ({
  icon,
  text,
  onClick,
  className,
  iconClassName,
  bgColor,
  hoverColor,
  textSide = "right",
}: IconButtonProps) => {
  const buttonClassName = classNames("p-2 ", className, {
    [`bg-${bgColor}`]: bgColor,
    [`hover:bg-${hoverColor}`]: hoverColor,
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      {(text && textSide === "left" && (
        <span className="ml-2 text-md">{text} </span>
      )) || <></>}
      <FontAwesomeIcon className={iconClassName} icon={icon} />
      {(text && textSide !== "left" && (
        <span className="ml-2 text-md">{text}</span>
      )) || <></>}
    </button>
  );
};

export default IconButton;
