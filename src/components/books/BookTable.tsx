import { Button, Link } from "@components/controls";
import Collapsible from "@components/layout/Collapsible";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { book } from "types/books";
import BookImage from "./BookImage";
import Rating from "./Rating";

interface BookTableProps {
  books: book[];
}

const BookTable = ({ books }: BookTableProps) => {
  const bookCardClasses = classNames(
    "flex p-2 w-full justify-between",
    "bg-zinc-800 border border-zinc-500",
    "transition duration-300 hover:bg-zinc-900 hover:cursor-pointer"
  );

  const booksByMonth = books.reduce((acc, book) => {
    const month = book.read_month;
    if (!month) return acc;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(book);
    return acc;
  }, {} as Record<string, book[]>);

  return (
    <div className="flex flex-col gap-4">
      {Object.keys(booksByMonth).map((month) => (
        <div key={month}>
          <h2 className="text-2xl font-bold mb-4">{month}</h2>
          <Collapsible
            buttonTextClosed={"show books from " + month}
            buttonTextExpanded={"hide books from " + month}
            buttonBelow
          >
            <div className="flex flex-col gap-2">
              {booksByMonth[month].map((book: book) => (
                <Link
                  to={"/book/" + book.isbn13}
                  className="w-full"
                  hideIcon
                  internal
                  noUnderline
                >
                  <div className="w-full">
                    <div className={bookCardClasses}>
                      <div className="flex items-center gap-6">
                        <BookImage
                          isbn13={book.isbn13}
                          alt={book.title}
                          size="XS"
                          quality="M"
                        />
                        <div>
                          <h2 className="text-xl font-bold">{book.title}</h2>
                          {book.series && (
                            <p className="text-gray-400 italic">
                              {book.series} #{book.series_number}
                            </p>
                          )}
                          <p className="text-gray-400">{book.author}</p>
                          <Rating rating={book.rating} />
                        </div>
                      </div>
                      <Button icon={faArrowRight} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default BookTable;
