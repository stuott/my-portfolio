import { ButtonInfo } from "types";
import Button from "./Button";

interface ButtonTableProps {
  buttons: ButtonInfo[];
  disabled?: boolean;
}

const ButtonTable = ({ buttons, disabled }: ButtonTableProps) => {
  return (
    <div className="flex text-white text-xl gap-3">
      {buttons.map((buttonInfo) => (
        <Button {...buttonInfo} disabled={disabled} />
      ))}
    </div>
  );
};

export default ButtonTable;
