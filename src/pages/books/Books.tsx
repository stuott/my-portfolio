import { BookSearch, BookShowcase } from "components/books";

const Books = () => {
  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <BookShowcase />
      <BookSearch />
    </div>
  );
};

export default Books;
