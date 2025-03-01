import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import IconButton from "./Button";
import Dropdown, { DropdownProps } from "./Dropdown";
import Filters, { FiltersProps } from "./Filters";
import TextInput from "./TextInput";

interface searchBarProps<T = {}> {
  setSearch: (searchTerm: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
  dropdown?: DropdownProps;
  filters?: FiltersProps<T>;
  search?: string;
  disabled?: boolean;
}

const SearchBar = <T,>({
  setSearch,
  onSearch,
  placeholder,
  className,
  dropdown,
  filters,
  search,
  disabled,
}: searchBarProps<T>) => {
  const elementClasses = classNames(
    "flex flex-col justify-center items-center gap-6 w-full",
    className
  );

  const buttonClasses = classNames("p-4", {
    "cursor-not-allowed bg-zinc-800 text-zinc-600": disabled,
    "bg-rose-800 hover:bg-rose-600": !disabled,
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={elementClasses} onKeyDown={onKeyDown}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        {dropdown && <Dropdown {...dropdown} disabled={disabled} />}
        <div className="flex space-x-6 w-full">
          <TextInput
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
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
