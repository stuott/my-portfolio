import usePageTracking from "@analytics/usePageTracking";
import { Footer, Navbar } from "@components/layout";
import { pages } from "@pages/index";
import classNames from "classnames";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";

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
  return (
    <main className="bg-zinc-900 font-mono">
      <Router>
        <ScrollToTop />
        <Navbar pages={pages.filter((page) => page.showInNavbar)} />
        <RoutedPageContent />
        <Footer />
      </Router>
    </main>
  );
};

const RoutedPageContent = () => {
  usePageTracking();

  return (
    <Routes>
      {pages.map(({ background, path, registerPath, Component }) => {
        const elementClasses = classNames(
          "min-h-screen ",
          background === "" ? "bg-map" : background ?? "bg-map"
        );

        return (
          <Route
            key={path}
            path={registerPath ?? path}
            element={
              <div className={elementClasses}>
                <div className="h-16 bg-zinc-900/50" />
                <Component />
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
