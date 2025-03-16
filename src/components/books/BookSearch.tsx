import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchBar } from "@components/controls";
import { Section } from "@components/layout";
import BookTable from "./BookTable";

import data from "@data/books.json";
import { book } from "types/books";

const BookSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [filteredBooks, setFilteredBooks] = useState<book[]>(data.books);

  useEffect(() => {
    if (search === "") {
      setFilteredBooks(data.books);
      return;
    }

    const bookMatchesSearch = (book: book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      (book.series && book.series.toLowerCase().includes(search.toLowerCase()));

    setFilteredBooks(data.books.filter(bookMatchesSearch));
  }, [search]);

  const onSearch = () => {
    setSearchParams({ search });
  };

  return (
    <Section title="Book Search">
      <div className="space-y-4">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onSearch={onSearch}
          placeholder="search for a book"
        />
        <BookTable books={filteredBooks} />
      </div>
    </Section>
  );
};

export default BookSearch;
