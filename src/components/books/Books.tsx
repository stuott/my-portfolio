import BookSearch from "./BookSearch";
import BookShowcase from "./BookShowcase";

const Books = () => {
  return (
    <div className="bg-zinc-900/50 min-h-screen">
      <BookShowcase />
      <BookSearch />
    </div>
  );
};

export default Books;
