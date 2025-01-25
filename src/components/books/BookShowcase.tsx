import { Link } from "@components/common";
import { Section } from "@components/layout";

import data from "@data/books.json";
import { book } from "types/books";
import BookImage from "./BookImage";

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
        <BookRating rating={book.rating} />
      </div>
    </Link>
  );
};

const BookRating = ({ rating }: { rating: number | undefined }) => {
  if (!rating) {
    return <p className="text-gray-400 italic">no rating found</p>;
  }

  const roundedRating = Math.floor(rating);
  const baseURL = "/graphics/rating/" + roundedRating;
  const ratingURL = Number.isInteger(rating)
    ? baseURL + ".svg"
    : baseURL + "_5.svg";

  return <img className="w-24" src={ratingURL} alt="book rating" />;
};

export default BookShowcase;
