import usePageTracking from "@analytics/usePageTracking";
import { Footer, Navbar } from "@components/layout";
import classNames from "classnames";
import { Suspense, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";
import { getPages, page } from "./pages";

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config: object) => void;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const NotFound = () => {
  return (
    <div className="w-full min-h-screen bg-sudoku text-center py-32 space-y-8 text-white">
      <div>
        <h1 className="text-5xl font-bold">Oops!</h1>
        <h1 className="text-white text-2xl font-bold">Page Not Found</h1>
      </div>
      <h1 className="text-2xl italic">
        Try one of the links above to get back
      </h1>
    </div>
  );
};

const App = () => {
  const [pages, setPages] = useState<page[]>([]);
  const [navbarPages, setNavbarPages] = useState<page[]>([]);

  useEffect(() => {
    const loadPages = async () => {
      const loadedPages = await getPages();
      setPages(loadedPages);
    };

    loadPages();
  }, []);

  useEffect(() => {
    // Filter and sort pages for the navbar by `showInNavbar` property and `path`
    const filteredPages = pages.filter((page) => page.showInNavbar);
    const sortedPages = filteredPages.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });
    setNavbarPages(sortedPages);
  }, [pages]);

  return (
    <main className="bg-zinc-900 font-mono">
      <Router>
        <ScrollToTop />
        <Navbar pages={navbarPages} />
        <Suspense fallback={<div className="h-screen bg-sudoku" />}>
          <RoutedPageContent pages={pages} />
        </Suspense>
        <Footer />
      </Router>
    </main>
  );
};

const RoutedPageContent = ({ pages }: { pages: page[] }) => {
  usePageTracking();

  return (
    <Routes>
      {pages.map(({ background, path, registerPath, Component }) => {
        const elementClasses = classNames(background ?? "bg-map");

        return (
          <Route
            key={path}
            path={registerPath ?? path}
            element={
              <div className={elementClasses}>
                <div className="h-16 bg-zinc-900/50" />
                <div className="min-h-screen bg-zinc-900/50">
                  <Component />
                </div>
              </div>
            }
          />
        );
      })}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
