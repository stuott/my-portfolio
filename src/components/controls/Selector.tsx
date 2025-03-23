import React, { useState } from "react";

interface SelectorProps {
  options: { label: string; value: string; content: React.ReactNode }[];
  onChange?: (selectedValue: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ options, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = Number(e.target.value);
    setSelectedIndex(newIndex);
    if (onChange) {
      onChange(options[newIndex].value);
    }
  };

  const selectorClasses = "w-full p-2 border-2 border-zinc-700 bg-zinc-900";

  return (
    <div>
      <select
        value={selectedIndex}
        onChange={handleChange}
        className={selectorClasses}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option.label}
          </option>
        ))}
      </select>
      <div style={{ marginTop: "1rem" }}>{options[selectedIndex].content}</div>
    </div>
  );
};

export default Selector;
