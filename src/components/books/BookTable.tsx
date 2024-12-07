import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Button } from "components/common";
import { book } from "./types";

interface BookTableProps {
  books: book[];
  setBookData: (book: book) => void;
}

const BookTable = ({ books, setBookData }: BookTableProps) => {
  const bookCardClasses = classNames(
    "flex p-4 w-full justify-between",
    "bg-zinc-800 border border-zinc-500",
    "transition hover:scale-[1.02] hover:bg-zinc-700 hover:cursor-pointer"
  );

  return (
    <div className="flex flex-col gap-4">
      {books.map((book: book) => (
        <div key={book.index} className="" onClick={() => setBookData(book)}>
          <div className={bookCardClasses}>
            <div className="flex items-center gap-6">
              <img
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn13}-M.jpg`}
                alt={book.title}
                className="w-12 h-16"
              />
              <div>
                <h2 className="text-xl font-bold">{book.title}</h2>
                {book.series && (
                  <p className="text-gray-400 italic">
                    {book.series} #{book.series_number}
                  </p>
                )}
                <p className="text-gray-400">{book.author}</p>
              </div>
            </div>
            <Button icon={faArrowRight} onClick={() => setBookData(book)} />
          </div>
        </div>
      ))}
      {books.length === 0 && (
        <p className="text-center my-10 text-gray-400">No books found</p>
      )}
    </div>
  );
};

export default BookTable;
