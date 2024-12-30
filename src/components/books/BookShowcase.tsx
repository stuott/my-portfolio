import { Link } from "components/common";
import { Section } from "components/layout";
import data from "data/books.json";
import BookImage from "./BookImage";
import { book } from "./types";

const BookShowcase = () => {
  return (
    <Section title="My Recent Reads">
      <div className="grid grid-cols-2 gap-4">
        {data.showcase.map((book) => (
          <ShowcaseCard book={book} />
        ))}
      </div>
    </Section>
  );
};

const ShowcaseCard = ({ book }: { book: book }) => {
  return (
    <div
      key={book.isbn13}
      className="bg-zinc-900 p-4 border border-zinc-500 flex gap-4 flex-col sm:flex-row"
    >
      <BookImage isbn13={book.isbn13} quality="L" alt={book.title} size="M" />
      <BookLink book={book} />
    </div>
  );
};

const BookLink = ({ book }: { book: book }) => {
  const ratingURL =
    process.env.PUBLIC_URL + "/graphics/rating/" + book.rating + ".svg";

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
        <img className="w-24" src={ratingURL} alt="rating" />
      </div>
    </Link>
  );
};

export default BookShowcase;
