import classNames from "classnames";

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  className?: string;
}

const ToggleButton = ({
  isToggled,
  onToggle,
  children,
  className,
}: ToggleButtonProps) => {
  const elementClasses = classNames("px-5 py-3", className, {
    "bg-zinc-800 text-zinc-400": !isToggled,
    "bg-rose-800 text-white": isToggled,
  });

  return (
    <button className={elementClasses} onClick={onToggle}>
      {children}
    </button>
  );
};

export default ToggleButton;
