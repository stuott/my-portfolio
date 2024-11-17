interface DropdownProps {
  options: string[];
  setSelection: (value: string) => void;
  placeholder?: string;
}

const Dropdown = ({ options, setSelection, placeholder }: DropdownProps) => {
  return (
    <select
      className="bg-zinc-900 p-4 border border-zinc-700 border-2"
      onChange={(e) => setSelection(e.target.value)}
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
