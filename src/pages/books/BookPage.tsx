import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { BookImage } from "@components/books";
import { Link } from "@components/common";
import { Section } from "@components/layout";

import data from "@data/books.json";
import { book } from "types/books";

const BookPage = () => {
  let { isbn13 } = useParams();

  const bookData: book | undefined = data.books.find(
    (book) => book.isbn13 === isbn13
  );

  if (!bookData) {
    return <NotFound />;
  }

  const backLink = (
    <Link internal hideIcon icon={faArrowLeft} to="/books">
      back
    </Link>
  );

  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <Section className="">
        <div className="space-y-4">
          {backLink}
          <div className="p-4 space-y-2 bg-zinc-800 border border-zinc-500">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <BookImage
                isbn13={bookData.isbn13}
                alt={bookData.title}
                size="XL"
                quality="L"
              />
              <div className="space-y-2">
                <BookMeta bookData={bookData} />
                <BookDescription description={bookData.description} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

const BookDescription = ({
  description,
}: {
  description: string[] | undefined;
}) => {
  if (!description) {
    return <p className="italic">No description found</p>;
  }

  return (
    <>
      {description.map((line) => (
        <p className="text-gray-400">{line}</p>
      ))}
    </>
  );
};

const BookMeta = ({ bookData }: { bookData: book }) => {
  const { title, author, genre, year, series, series_number } = bookData;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-lg">{author}</p>
      {series && (
        <p className="text-gray-400 italic">
          {series} #{series_number}
        </p>
      )}
      <p className="text-gray-400">
        {genre} - {year}
      </p>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="w-full bg-zinc-900/50 min-h-screen py-32 text-white">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-5xl font-bold">Sorry</h1>
        <h1 className="text-white text-2xl font-bold">
          We couldn't find that book - we'll check in the back!
        </h1>
        <Link className="text-2xl italic" internal to="/books">
          back to the main library
        </Link>
      </div>
    </div>
  );
};

export default BookPage;
