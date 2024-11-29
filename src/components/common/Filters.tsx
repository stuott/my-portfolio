import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";

export interface FiltersProps {
  filters: string[];
  onFilter?: (filter: string, index?: number) => void;
}

const Filters = ({ filters, onFilter }: FiltersProps) => {
  const [active, setActive] = useState<number>(-1);

  const handleFilters = (tag: string, index: number) => {
    if (!onFilter) return;

    if (active === index) {
      setActive(-1);
      onFilter("");
    } else {
      setActive(index);
      onFilter(tag, index);
    }
  };

  return (
    <div className="flex flex- gap-2 items-center">
      <FontAwesomeIcon
        icon={faFilter}
        className="text-zinc-500 hover:text-white cursor-pointer"
        onClick={() => handleFilters("", -1)}
        title="Clear filter"
      />
      <div className="flex gap-2 flex-wrap justify-center">
        {filters.map((filter, index) => (
          <FilterButton
            text={filter}
            active={active === index}
            onClick={() => handleFilters(filter, index)}
          />
        ))}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  text: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton = ({ text, active, onClick }: FilterButtonProps) => {
  const buttonClasses = classNames(
    "hover:bg-cyan-600 text-white px-4 py-1 rounded-lg",
    {
      "bg-cyan-600": active,
      "bg-cyan-800": !active,
    }
  );
  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Filters;
