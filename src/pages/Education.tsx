import { Classes, College } from "@components/education";
import { page } from "pages";

const Education = () => {
  return (
    <>
      <College />
      <Classes />
      <div className="h-16" />
    </>
  );
};

export const pageInfo: page = {
  path: "/education",
  name: "Education",
  Component: Education,
  showInNavbar: true,
  background: "bg-bevel",
};
