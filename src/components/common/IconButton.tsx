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
  hoverBgColor?: string;
  flipped?: boolean;
  scale?: boolean;
}

/**
 * Icon button component.
 * @param icon - Icon to display (FontAwesome).
 * @param text - Text to display (see flipped param for positioning).
 * @param onClick - Function to call on click.
 * @param className - Additional classes for the main button.
 * @param iconClassName - Additional classes for just the icon.
 * @param bgColor - Background color for the whole button.
 * @param hoverBgColor - Background color while the user is hovering.
 * @param flipped - Whether to flip the text and icon (default on the right).
 * @param scale - Whether to scale the button on hover.
 */
const IconButton = ({
  icon,
  text,
  onClick,
  className,
  iconClassName,
  bgColor,
  hoverBgColor,
  flipped = false,
  scale = false,
}: IconButtonProps) => {
  const buttonClassName = classNames("p-3 w-fit", className, {
    [`bg-${bgColor}`]: bgColor,
    [`hover:bg-${hoverBgColor}`]: hoverBgColor,
    "hover:scale-[1.05] transition duration-300": scale,
  });

  return (
    <button className={buttonClassName} onClick={onClick}>
      {(text && flipped && <span className="ml-2 text-md">{text} </span>) || (
        <></>
      )}
      <FontAwesomeIcon className={iconClassName} icon={icon} />
      {(text && !flipped && <span className="ml-2 text-md">{text}</span>) || (
        <></>
      )}
    </button>
  );
};

export default IconButton;
