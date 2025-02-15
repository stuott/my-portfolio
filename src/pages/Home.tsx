import { Contact, Experience, Intro } from "@components/home";
import { page } from "pages";

const Home = () => {
  return (
    <>
      <Intro />
      <div className="flex flex-col pb-10 xl:gap-10 xl:flex-row">
        <div className="xl:w-2/3">
          <Experience />
        </div>
        <div className="xl:w-1/3">
          <Contact />
        </div>
      </div>
    </>
  );
};

export const pageInfo: page = {
  path: "/",
  name: "Home",
  Component: Home,
  showInNavbar: true,
};
