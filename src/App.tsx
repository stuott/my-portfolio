import { pages } from "components";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Navbar";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config: object) => void;
  }
}

function ScrollToTopAndTrack() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.gtag("config", "G-DBWJMWB5XZ", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}

const NotFound = () => {
  return (
    <div className="w-full text-center py-32 space-y-8 text-white">
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

function App() {
  return (
    <main className="bg-zinc-900">
      <Router>
        <ScrollToTopAndTrack />
        <Navbar pages={pages.filter((page) => page.showInNavbar)} />
        <PageContent />
        <Footer />
      </Router>
    </main>
  );
}

const PageContent = () => {
  return (
    <Routes>
      {pages.map(({ background, path, Component }) => {
        return (
          <Route
            path={path}
            element={
              <div
                className={
                  (background === "" ? "bg-map" : background ?? "bg-map") +
                  " min-h-screen"
                }
              >
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
