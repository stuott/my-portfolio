import { Button, SearchBar } from "components/common";
import { Section } from "components/layout";
import data from "data/books.json";
import { useState } from "react";
import BookCard from "./BookCard";
import BookTable from "./BookTable";
import { book } from "./types";

const BookReviews = () => {
  const [bookData, setBookData] = useState<book | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<book[]>(data.books);
  const [booksDisplayed, setBooksDisplayed] = useState<number>(5);

  const onSearch = () => {
    setBookData(null);

    if (search === "") {
      setFilteredBooks(data.books);
      return;
    }

    const bookMatchesSearch = (book: book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      (book.series && book.series.toLowerCase().includes(search.toLowerCase()));

    setFilteredBooks(data.books.filter(bookMatchesSearch));
  };

  const showTable = !bookData;

  const clearBookData = () => setBookData(null);

  const showAllBooks = () => setBooksDisplayed(filteredBooks.length);

  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <Section title="Book Reviews">
        <SearchBar
          setSearch={setSearch}
          onSearch={onSearch}
          placeholder="search for a book"
        />
        {showTable && (
          <BookTable
            books={filteredBooks.slice(0, booksDisplayed)}
            setBookData={setBookData}
          />
        )}
        {showTable && (
          <ListCap
            displayed={booksDisplayed}
            total={filteredBooks.length}
            showAllBooks={showAllBooks}
          />
        )}
        {bookData && (
          <BookCard bookData={bookData} clearBookData={clearBookData} />
        )}
      </Section>
    </div>
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

export default BookReviews;
