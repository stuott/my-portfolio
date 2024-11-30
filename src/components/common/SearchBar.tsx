import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import IconButton from "./Button";
import Dropdown, { DropdownProps } from "./Dropdown";
import Filters, { FiltersProps } from "./Filters";

interface searchBarProps {
  setSearch: (searchTerm: string) => void;
  onSearch: () => void;
  placeholder: string;
  className?: string;
  dropdown?: DropdownProps;
  filters?: FiltersProps;
  disabled?: boolean;
}

const SearchBar = ({
  setSearch,
  onSearch,
  placeholder,
  className,
  dropdown,
  filters,
  disabled,
}: searchBarProps) => {
  const elementClasses = classNames(
    "flex flex-col justify-center items-center gap-6 w-full",
    className
  );

  const barClasses = classNames("px-8 py-4 flex-grow border-zinc-700", {
    "cursor-not-allowed bg-zinc-800 placeholder:text-zinc-600": disabled,
    "bg-zinc-900 border-2 text-white": !disabled,
  });

  const buttonClasses = classNames("p-4", {
    "cursor-not-allowed bg-zinc-800 text-zinc-600": disabled,
    "bg-cyan-800 hover:bg-cyan-600": !disabled,
  });

  return (
    <div className={elementClasses}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        {dropdown && <Dropdown {...dropdown} disabled={disabled} />}
        <div className="flex space-x-6 w-full">
          <input
            type="text"
            placeholder={placeholder}
            className={barClasses}
            onChange={(e) => setSearch(e.target.value)}
            disabled={disabled}
          />
          <IconButton
            onClick={onSearch}
            className={buttonClasses}
            icon={faMagnifyingGlass}
          />
        </div>
      </div>
      {filters && <Filters {...filters} disabled={disabled} />}
    </div>
  );
};

export default SearchBar;
