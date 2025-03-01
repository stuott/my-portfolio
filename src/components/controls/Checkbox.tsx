import classNames from "classnames";
import { useId } from "react";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  const checkboxClasses = classNames(
    "relative peer shrink-0 bg-zinc-900",
    "appearance-none w-6 h-6 border-2 border-zinc-500 rounded-sm bg-white",
    "mt-1 cursor-pointer",
    "checked:bg-red-800 checked:border-0"
  );
  const checkboxID = useId();

  return (
    <div className="flex gap-2 justify-center items-center">
      <input
        className={checkboxClasses}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={checkboxID}
      />
      {label && <label htmlFor={checkboxID}>{label}</label>}
      <svg
        className="
          absolute 
          w-4 h-4 mt-1
          hidden peer-checked:block pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
