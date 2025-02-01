import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import objectHash from "object-hash";
import { useState } from "react";

export interface FiltersProps<T> {
  filters: T[];
  onFilter?: (filter: T | "", index?: number) => void;
  disabled?: boolean;
}

const Filters = <T,>({ filters, onFilter, disabled }: FiltersProps<T>) => {
  const [active, setActive] = useState<number>(-1);

  if (filters.length === 0) return <></>;

  const filterListClasses = classNames("flex gap-2 items-center", {
    "cursor-not-allowed": disabled,
  });

  const filterButtonClasses = classNames("", {
    "cursor-pointer text-zinc-500 hover:text-white": !disabled,
    "cursor-not-allowed text-zinc-700": disabled,
  });

  const handleFilters = (filter: T | "", index: number) => {
    if (!onFilter) return;

    if (active === index) {
      setActive(-1);
      onFilter("");
    } else {
      setActive(index);
      onFilter(filter, index);
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
            key={filter ? objectHash(filter) : index}
            text={filter as string}
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
    "bg-rose-800": !active,
    "bg-rose-600": active,
    "hover:bg-rose-600 text-white": !disabled,
    "cursor-not-allowed bg-zinc-800 text-zinc-500": disabled,
  });
  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Filters;
