import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface IconButtonProps {
  icon: IconDefinition;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  bgColor?: string;
  hoverColor?: string;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, onClick, className, iconClassName, bgColor, hoverColor } =
    props;

  const buttonClassName = classNames("text-sm p-2", className, {
    [`bg-${bgColor}`]: bgColor,
    [`hover:bg-${hoverColor}`]: hoverColor,
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      <FontAwesomeIcon className={iconClassName} icon={icon} />
    </button>
  );
};

export default IconButton;
