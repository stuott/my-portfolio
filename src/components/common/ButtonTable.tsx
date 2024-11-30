import { ButtonInfo } from "types";
import Button from "./Button";

interface ButtonTableProps {
  buttons: ButtonInfo[];
}

const ButtonTable = ({ buttons }: ButtonTableProps) => {
  return (
    <div className="flex text-white text-xl gap-3">
      {buttons.map((buttonInfo) => (
        <Button {...buttonInfo} />
      ))}
    </div>
  );
};

export default ButtonTable;
