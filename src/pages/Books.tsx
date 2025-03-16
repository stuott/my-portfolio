import { BookSearch } from "@components/books";
import { Link } from "@components/controls";
import { Section } from "@components/layout";

const Books = () => {
  return (
    <>
      <Section>
        <div className="space-y-4">
          <p>
            check out my storygraph for the most up to date info about my
            reading habits
          </p>
          <Link to="https://app.thestorygraph.com/profile/stevenott">
            my storygraph profile
          </Link>
          <p className="italic">last updated 3/15/25</p>
        </div>
      </Section>
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
