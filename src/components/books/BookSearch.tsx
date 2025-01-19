import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button, SearchBar } from "components/common";
import { Section } from "components/layout";
import BookTable from "./BookTable";

import data from "data/books.json";
import { book } from "types/books";

const BookSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [filteredBooks, setFilteredBooks] = useState<book[]>(data.books);
  const [booksDisplayed, setBooksDisplayed] = useState<number>(5);

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

  const showAllBooks = () => setBooksDisplayed(filteredBooks.length);

  return (
    <Section title="Book Search">
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={onSearch}
        placeholder="search for a book"
      />
      <BookTable books={filteredBooks.slice(0, booksDisplayed)} />
      <ListCap
        displayed={booksDisplayed}
        total={filteredBooks.length}
        showAllBooks={showAllBooks}
      />
    </Section>
  );
};

interface ListCapProps {
  displayed: number;
  total: number;
  showAllBooks: () => void;
}

const ListCap = ({ displayed, total, showAllBooks }: ListCapProps) => {
  return (
    <div className="my-6 flex flex-col items-center gap-4">
      {total > displayed && (
        <>
          <p className="text-gray-400">
            showing {displayed} of {total} books
          </p>
          <Button
            onClick={showAllBooks}
            className="text-gray-400 hover:text-gray-200"
          >
            show all books
          </Button>
        </>
      )}
      {total === displayed && (
        <p className="text-gray-400">showing all books</p>
      )}
    </div>
  );
};

export default BookSearch;
