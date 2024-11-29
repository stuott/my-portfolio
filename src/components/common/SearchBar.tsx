import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Dropdown, { DropdownProps } from "./Dropdown";
import Filters, { FiltersProps } from "./Filters";
import IconButton from "./IconButton";

interface searchBarProps {
  setSearch: (searchTerm: string) => void;
  onSearch?: () => void;
  placeholder: string;
  className?: string;
  dropdown?: DropdownProps;
  filters?: FiltersProps;
}

const SearchBar = ({
  setSearch,
  onSearch,
  placeholder,
  className,
  dropdown,
  filters,
}: searchBarProps) => {
  const elementClasses = classNames(
    "flex flex-col justify-center items-center gap-6 w-full",
    className
  );

  return (
    <div className={elementClasses}>
      <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
        {dropdown && <Dropdown {...dropdown} />}
        <div className="flex space-x-6 w-full">
          <input
            type="text"
            placeholder={placeholder}
            className="px-8 py-4 text-white flex-grow bg-zinc-900 border-2 border-zinc-700"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton
            className="bg-cyan-800 hover:bg-cyan-600 p-4"
            icon={faMagnifyingGlass}
            onClick={onSearch}
          />
        </div>
      </div>
      {filters && <Filters {...filters} />}
    </div>
  );
};

export default SearchBar;
