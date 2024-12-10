import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "components/common";
import { Section } from "components/layout";
import data from "data/books.json";
import { useParams } from "react-router-dom";

const BookCard = () => {
  let { isbn13 } = useParams();

  const bookData = data.books.find((book) => book.isbn13 === isbn13);

  if (!bookData) {
    return <></>;
  }

  return (
    <Section className="bg-zinc-900/50 min-h-screen">
      <div className="space-y-4">
        <Link internal hideIcon icon={faArrowLeft} to="/books">
          back
        </Link>
        <div className="p-4 space-y-2 bg-zinc-800 border border-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={`https://covers.openlibrary.org/b/isbn/${bookData.isbn13}-L.jpg`}
              alt={bookData.title}
              className="w-80"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{bookData.title}</h2>
              <p className="">{bookData.author}</p>
              {bookData.series && (
                <p className="text-gray-400 italic">
                  {bookData.series} #{bookData.series_number}
                </p>
              )}
              <p className="text-gray-400">
                {bookData.genre} - {bookData.year}
              </p>
              {bookData.description &&
                bookData.description.map((description) => (
                  <p className="text-gray-400">{description}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BookCard;
