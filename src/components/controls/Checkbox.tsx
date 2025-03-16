import classNames from "classnames";
import { useId } from "react";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, checked, disabled, onChange }: CheckboxProps) => {
  const checkboxClasses = classNames(
    "relative peer shrink-0 bg-zinc-900",
    "appearance-none w-6 h-6 border-2 border-zinc-500 rounded-sm bg-white",
    "mt-1 cursor-pointer",
    "checked:bg-red-800 checked:border-0",
    {
      "checked:bg-zinc-700 cursor-not-allowed opacity-50 pointer-events-none":
        disabled,
    }
  );
  const checkboxID = useId();

  const checkClasses = classNames(
    "absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none",
    {
      "text-zinc-500": disabled,
    }
  );

  const labelClasses = classNames("select-none", {
    "text-zinc-500": disabled,
    "cursor-pointer": !disabled,
  });

  return (
    <div className="flex gap-2 items-center">
      <div className="flex justify-center items-center">
        <input
          disabled={disabled}
          className={checkboxClasses}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={checkboxID}
        />
        <svg
          className={checkClasses}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <label htmlFor={checkboxID} className={labelClasses}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
