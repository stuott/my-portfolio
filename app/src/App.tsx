import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Education from "components/education/Education";
import Home from "components/home/Home";
import Projects from "components/projects/Projects";
import RecipeList from "components/projects/RecipeList";
import { Page } from "types";

import Navbar from "components/Navbar";

const pages: Page[] = [
  { path: "/", name: "Home", Component: Home, showInNavbar: true },
  {
    path: "/education",
    name: "Education",
    Component: Education,
    showInNavbar: true,
  },
  {
    path: "/projects",
    name: "Projects",
    Component: Projects,
    showInNavbar: true,
  },
  {
    path: "/projects/recipe-list",
    name: "Recipe List",
    Component: RecipeList,
    showInNavbar: false,
  },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <main className="bg-[url('../public/map-pattern.svg')]">
      <Router>
        <ScrollToTop />
        <Navbar pages={pages} />
        <PageContent pages={pages} />
        <Footer />
      </Router>
    </main>
  );
}

function PageContent(props: { pages: Page[] }) {
  const { pages } = props;
  return (
    <div className="mx-auto min-h-screen max-w-screen-lg">
      <Routes>
        {pages.map(({ path, Component }) => {
          return <Route path={path} element={<Component />} />;
        })}
      </Routes>
    </div>
  );
}

function Footer() {
  return (
    <div className="w-full text-white p-4 bg-zinc-800 mt-10">
      Check out the source code on{" "}
      <a
        className="underline text-cyan-400"
        href="https://github.com/stuott/my-portfolio"
      >
        GitHub
      </a>
    </div>
  );
}

export default App;
