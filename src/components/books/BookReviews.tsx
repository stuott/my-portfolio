import { SearchBar } from "components/common";
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

  const showTable = !bookData;

  const onSearch = () => {
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

  return (
    <Section title="Book Reviews" className="bg-zinc-900/50 min-h-screen">
      <SearchBar
        setSearch={setSearch}
        onSearch={onSearch}
        placeholder="search for a book"
      />
      {showTable && (
        <BookTable books={filteredBooks} setBookData={setBookData} />
      )}
      {bookData && (
        <BookCard bookData={bookData} clearBookData={() => setBookData(null)} />
      )}
    </Section>
  );
};

export default BookReviews;
