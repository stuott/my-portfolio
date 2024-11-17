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
}

const IconButton = ({
  icon,
  text,
  onClick,
  className,
  iconClassName,
  bgColor,
  hoverColor,
}: IconButtonProps) => {
  const buttonClassName = classNames("text-sm p-2", className, {
    [`bg-${bgColor}`]: bgColor,
    [`hover:bg-${hoverColor}`]: hoverColor,
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      <FontAwesomeIcon className={iconClassName} icon={icon} />
      {(text && <span className="ml-2 text-md">{text}</span>) || null}
    </button>
  );
};

export default IconButton;
