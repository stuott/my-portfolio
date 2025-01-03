import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";

export interface FiltersProps {
  filters: string[];
  onFilter?: (filter: string, index?: number) => void;
  disabled?: boolean;
}

const Filters = ({ filters, onFilter, disabled }: FiltersProps) => {
  const [active, setActive] = useState<number>(-1);

  if (filters.length === 0) return <></>;

  const filterListClasses = classNames("flex gap-2 items-center", {
    "cursor-not-allowed": disabled,
  });

  const filterButtonClasses = classNames("", {
    "cursor-pointer text-zinc-500 hover:text-white": !disabled,
    "cursor-not-allowed text-zinc-700": disabled,
  });

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
    <div className={filterListClasses}>
      <FontAwesomeIcon
        icon={faFilter}
        className={filterButtonClasses}
        onClick={() => handleFilters("", -1)}
        title="Clear filter"
      />
      <div className="flex gap-2 flex-wrap justify-center">
        {filters.map((filter, index) => (
          <FilterButton
            text={filter}
            active={active === index}
            onClick={() => handleFilters(filter, index)}
            disabled={disabled}
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
  disabled?: boolean;
}

const FilterButton = ({
  text,
  active,
  onClick,
  disabled,
}: FilterButtonProps) => {
  const buttonClasses = classNames("px-4 py-1 rounded-lg", {
    "bg-cyan-800": !active,
    "bg-cyan-600": active,
    "hover:bg-cyan-600 text-white": !disabled,
    "cursor-not-allowed bg-zinc-800 text-zinc-500": disabled,
  });
  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Filters;
