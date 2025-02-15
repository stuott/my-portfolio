import { Link } from "@components/controls";
import { Section } from "@components/layout";

import data from "@data/books.json";
import { book } from "types/books";
import BookImage from "./BookImage";
import Rating from "./Rating";

const BookShowcase = () => {
  return (
    <Section title="My Recent Reads">
      <div className="grid grid-cols-2 gap-4">
        {data.showcase.map((isbn) => (
          <ShowcaseCard
            book={data.books.find((book) => book.isbn13 === isbn)}
          />
        ))}
      </div>
    </Section>
  );
};

const ShowcaseCard = ({ book }: { book: book | undefined }) => {
  return (
    <div className="bg-zinc-900 p-4 border border-zinc-500 flex gap-4 flex-col sm:flex-row">
      {book && (
        <>
          <BookImage
            isbn13={book.isbn13}
            quality="L"
            alt={book.title}
            size="M"
          />
          <BookLink book={book} />
        </>
      )}
    </div>
  );
};

const BookLink = ({ book }: { book: book }) => {
  return (
    <Link
      to={"/book/" + book.isbn13}
      className="hover:no-underline"
      internal
      hideIcon
    >
      <div className="h-full flex flex-col justify-between text-balance">
        <div>
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm italic">{book.author}</p>
        </div>
        <Rating rating={book.rating} />
      </div>
    </Link>
  );
};

export default BookShowcase;
