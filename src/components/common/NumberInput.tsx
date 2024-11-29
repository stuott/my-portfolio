import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconButton from "./IconButton";

type PolarityState = true | false | undefined;

interface NumberInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
  showPolarity?: boolean;
  onPolarityChange?: (value: PolarityState) => void;
}

const NumberInput = ({
  value,
  onChange,
  showPolarity = false,
  onPolarityChange = undefined,
}: NumberInputProps) => {
  const [polarity, setPolarity] = useState<PolarityState>(undefined);

  const handlePolarity = (value: boolean) => {
    if (polarity === value) {
      setPolarity(undefined);
      onPolarityChange && onPolarityChange(undefined);
    } else {
      setPolarity(value);
      onPolarityChange && onPolarityChange(value);
    }
  };

  return (
    <>
      {showPolarity && (
        <div className="flex flex-col">
          <IconButton
            className="p-1"
            bgColor={polarity !== undefined && polarity ? "green-900/50" : ""}
            hoverBgColor="green-900"
            icon={faPlus}
            onClick={() => handlePolarity(true)}
          />
          <IconButton
            className="p-1"
            bgColor={polarity !== undefined && !polarity ? "red-900/50" : ""}
            hoverBgColor="rose-900"
            icon={faMinus}
            onClick={() => handlePolarity(false)}
          />
        </div>
      )}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]"
        value={value}
        disabled={showPolarity && polarity === undefined}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-zinc-900 p-2 w-16 flex-grow"
      />
    </>
  );
};

export default NumberInput;
