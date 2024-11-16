import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

interface NumberInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
  polarity?: boolean;
  handlePolarity?: (value: boolean) => void;
}

const NumberInput = ({
  value,
  onChange,
  polarity,
  handlePolarity,
}: NumberInputProps) => {
  return (
    <>
      {handlePolarity && (
        <div className="flex flex-col">
          <IconButton
            className="p-1"
            bgColor={polarity ? "green-900/50" : undefined}
            hoverColor="green-900"
            icon={faPlus}
            onClick={() => handlePolarity(true)}
          />
          <IconButton
            className="p-1"
            bgColor={!polarity ? "red-900/50" : undefined}
            hoverColor="rose-900"
            icon={faMinus}
            onClick={() => handlePolarity(false)}
          />
        </div>
      )}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-zinc-900 p-2 w-16 flex-grow"
      />
    </>
  );
};

export default NumberInput;
