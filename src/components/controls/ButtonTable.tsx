import hash from "object-hash";
import Button, { ButtonProps } from "./Button";

interface ButtonTableProps {
  buttons: ButtonProps[];
  disabled?: boolean;
}

const ButtonTable = ({ buttons, disabled }: ButtonTableProps) => {
  return (
    <div className="flex text-white text-xl gap-3">
      {buttons.map((buttonInfo, index) => {
        const buttonKey = "button_" + hash(buttonInfo) + index;
        return <Button key={buttonKey} {...buttonInfo} disabled={disabled} />;
      })}
    </div>
  );
};

export default ButtonTable;
