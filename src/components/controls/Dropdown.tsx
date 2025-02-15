import classNames from "classnames";

export interface DropdownProps {
  options: string[];
  placeholder?: string;
  setSelection?: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

const Dropdown = ({
  options,
  setSelection,
  placeholder,
  disabled,
  label,
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
    <div className="flex flex-col gap-1">
      {label}
      <select
        className={selectClasses}
        onChange={(e) => setSelection && setSelection(e.target.value)}
        disabled={disabled}
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
