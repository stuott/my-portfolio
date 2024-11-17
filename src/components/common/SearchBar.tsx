import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface searchBarProps {
  placeholder: string;
  setSearch: (searchTerm: string) => void;
  filters?: string[];
  setFilter?: (filterTerm: string) => void;
  className?: string;
}

const SearchBar = ({
  placeholder,
  setSearch,
  filters,
  setFilter,
  className,
}: searchBarProps) => {
  const [activeFilter, setActiveFilter] = useState(-1);

  const onFilterClick = (tag: string, index: number) => {
    if (!setFilter) return;

    if (activeFilter === index) {
      setActiveFilter(-1);
      setFilter("");
    } else {
      setActiveFilter(index);
      setFilter(tag);
    }
  };

  return (
    <div
      className={
        "flex flex-col justify-center items-center gap-6 w-full " + className
      }
    >
      <input
        type="text"
        placeholder={placeholder}
        className="px-8 py-4 text-white w-3/4 bg-zinc-900 rounded-2xl border border-zinc-700 border-2"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filters ? (
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <FontAwesomeIcon
            icon={faFilter}
            className="text-zinc-500 hover:text-white cursor-pointer"
            onClick={(e) => onFilterClick("", -1)}
            title="Clear filter"
          />
          <div className="flex gap-2 flex-wrap justify-center">
            {filters.map((tag, index) => (
              <button
                className={`hover:bg-cyan-600 text-white px-4 py-1 rounded-lg ${
                  activeFilter === index ? "bg-cyan-600" : "bg-cyan-800"
                }`}
                onClick={(e) => onFilterClick(tag, index)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
