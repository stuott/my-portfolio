import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useState } from "react";
import IconButton from "./Button";

type PolarityState = true | false | undefined;

interface PolarityButtonsProps {
  polarity: PolarityState;
  onPolarityChange: (value: PolarityState) => void;
  disabled?: boolean;
}

const PolarityButtons = ({
  polarity,
  onPolarityChange,
  disabled,
}: PolarityButtonsProps) => {
  return (
    <div className="flex flex-col">
      <IconButton
        className="p-1"
        bg={polarity !== undefined && polarity ? "green-900/50" : ""}
        hoverBg="green-900"
        icon={faPlus}
        iconSize="sm"
        onClick={() => onPolarityChange(true)}
        disabled={disabled}
      />
      <IconButton
        className="p-1"
        bg={polarity !== undefined && !polarity ? "red-900/50" : ""}
        hoverBg="rose-900"
        icon={faMinus}
        iconSize="sm"
        onClick={() => onPolarityChange(false)}
        disabled={disabled}
      />
    </div>
  );
};

interface NumberInputProps {
  value?: number | undefined;
  onChange: (value: number) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  decimal?: boolean;
  showPolarity?: boolean;
  onPolarityChange?: (value: PolarityState) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const NumberInput = ({
  value,
  onChange,
  label,
  disabled,
  className,
  decimal,
  showPolarity = false,
  onKeyDown,
  onPolarityChange = undefined,
}: NumberInputProps) => {
  const [polarity, setPolarity] = useState<PolarityState>(undefined);

  const handlePolarityChange = (value: PolarityState) => {
    if (polarity === value) {
      setPolarity(undefined);
      onPolarityChange && onPolarityChange(undefined);
    } else {
      setPolarity(value);
      onPolarityChange && onPolarityChange(value);
    }
  };

  const inputClasses = classNames("h-full p-2 w-16 border", className, {
    "cursor-not-allowed bg-zinc-800 text-zinc-600": disabled,
    "bg-zinc-900 focus:bg-zinc-800 hover:bg-zinc-800": !disabled,
  });

  const inputDisabled = (showPolarity && polarity === undefined) || disabled;

  const inputMode = decimal ? "decimal" : "numeric";
  const pattern = decimal ? "" : "[0-9]*";

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "" || isNaN(Number(inputValue))) {
      onChange(0);
      return;
    }

    onChange(decimal ? parseFloat(inputValue) : Number(inputValue));
  };

  return (
    <div className="flex flex-col gap-1">
      {label}
      <div className="flex gap-2 items-center">
        {showPolarity && onPolarityChange && (
          <PolarityButtons
            polarity={polarity}
            onPolarityChange={handlePolarityChange}
            disabled={disabled}
          />
        )}
        <input
          type="text"
          onKeyDown={onKeyDown}
          inputMode={inputMode}
          value={value}
          disabled={inputDisabled}
          pattern={pattern}
          onChange={onInputChange}
          className={inputClasses}
        />
      </div>
    </div>
  );
};

export default NumberInput;
