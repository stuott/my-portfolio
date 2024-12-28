import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Link } from "components/common";
import { Section } from "components/layout";
import data from "data/books.json";
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

interface ShowcaseCardProps {
  book: book;
}

const ShowcaseCard = ({ book }: ShowcaseCardProps) => {
  return (
    <div
      key={book.isbn13}
      className="bg-zinc-900 p-4 border border-zinc-500 flex gap-4 flex-col sm:flex-row"
    >
      <img
        src={`https://covers.openlibrary.org/b/isbn/${book.isbn13}-L.jpg`}
        alt={book.title}
        className="w-36 h-48"
      />
      <Link
        to={"/book/" + book.isbn13}
        className="w-full hover:no-underline"
        hideIcon
        internal
      >
        <div>
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm">{book.author}</p>
          <p className="text-sm">{book.genre}</p>
          <Button icon={faArrowCircleRight} />
        </div>
      </Link>
    </div>
  );
};

export default BookShowcase;
