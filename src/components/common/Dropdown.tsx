import classNames from "classnames";

export interface DropdownProps {
  options: string[];
  placeholder?: string;
  setSelection?: (value: string) => void;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  setSelection,
  placeholder,
  disabled,
}: DropdownProps) => {
  const selectClasses = classNames(
    "p-4 border-zinc-700",
    { "cursor-no-drop text-zinc-600 bg-zinc-800 border-0": disabled },
    {
      "cursor-pointer bg-zinc-900 border-2 hover:bg-zinc-800 focus:bg-zinc-800":
        !disabled,
    }
  );

  return (
    <select
      className={selectClasses}
      onChange={(e) => setSelection && setSelection(e.target.value)}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled selected>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
