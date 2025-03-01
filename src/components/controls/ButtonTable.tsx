import hash from "object-hash";
import Button, { ButtonProps } from "./Button";

interface ButtonTableProps {
  buttons?: ButtonProps[];
  disabled?: boolean;
  children?: React.ReactNode;
}

const ButtonTable = ({ buttons, disabled, children }: ButtonTableProps) => {
  return (
    <div className="flex text-white gap-3">
      {buttons &&
        buttons.map((buttonInfo, index) => {
          const buttonKey = "button_" + hash(buttonInfo) + index;
          return <Button key={buttonKey} {...buttonInfo} disabled={disabled} />;
        })}
      {children}
    </div>
  );
};

export default ButtonTable;
