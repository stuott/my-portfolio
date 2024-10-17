import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

import Home from "components/home/Home";
import Projects from "components/projects/Projects";
import { Page } from "types";

const pages: Page[] = [
  { path: "/", name: "Home", Component: Home },
  { path: "/projects", name: "Projects", Component: Projects },
];

function App() {
  return (
    <main className="">
      <Router>
        <Navbar pages={pages} />
        <PageContent pages={pages} />
        <Footer />
      </Router>
    </main>
  );
}

function Navbar(props: { pages: Page[] }) {
  const { pages } = props;

  function getLinkClasses(props: { isActive: boolean }) {
    const { isActive } = props;
    return `${
      isActive ? "bg-cyan-700/20" : ""
    } text-lg px-4 py-2 transition hover:bg-cyan-700`;
  }

  return (
    <header className="mx-auto text-white bg-zinc-900 fixed top-0 w-full">
      <nav className="px-2 py-2 flex justify-evenly">
        {pages.map(({ path, name }) => (
          <NavLink to={path} className={getLinkClasses}>
            {name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function PageContent(props: { pages: Page[] }) {
  const { pages } = props;
  return (
    <div className="mx-auto min-h-screen max-w-screen-lg py-24 px-6 md:px-12 lg:px-24">
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
    <div className="w-full text-white p-4 bg-zinc-800">
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
