import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/common";
import { book } from "./types";

interface BookCardProps {
  bookData: book;
  clearBookData: () => void;
}

const BookCard = ({ bookData, clearBookData }: BookCardProps) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={clearBookData}
        icon={faArrowLeft}
        scale
        hoverBg="cyan-800"
      >
        back
      </Button>
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
  );
};

export default BookCard;
