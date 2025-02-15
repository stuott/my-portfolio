import { BookSearch, BookShowcase } from "@components/books";

const Books = () => {
  return (
    <>
      <BookShowcase />
      <BookSearch />
    </>
  );
};

export const pageInfo = {
  path: "/books/",
  name: "Books",
  Component: Books,
  showInNavbar: false,
  background: "bg-intersect",
};
