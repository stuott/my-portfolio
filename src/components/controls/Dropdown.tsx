import classNames from "classnames";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: readonly Option[];
  placeholder?: string;
  setSelection?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  defaultValue?: string;
}

const Dropdown = ({
  options,
  setSelection,
  placeholder,
  disabled,
  label,
  defaultValue,
}: DropdownProps) => {
  const [valueChanged, setValueChanged] = useState(false);

  const onValueUpdate = (value: string) => {
    setSelection && setSelection(value);
    !valueChanged && setValueChanged(true);
  };

  const selectClasses = classNames(
    "p-4 border-zinc-700 border-2 default:italic",
    {
      "cursor-no-drop text-zinc-600 bg-zinc-800 ": disabled,
      "cursor-pointer bg-zinc-900 hover:bg-zinc-800 focus:bg-zinc-800":
        !disabled,
      "text-zinc-600": !defaultValue || defaultValue === "",
    }
  );

  return (
    <div className="flex flex-col gap-1">
      {label}
      <select
        className={selectClasses}
        onChange={(e) => onValueUpdate(e.target.value)}
        disabled={disabled}
        defaultValue={defaultValue ?? ""}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option className="text-white" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
