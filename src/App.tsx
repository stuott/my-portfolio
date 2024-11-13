import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

import { pages } from "components";
import Footer from "components/Layout/Footer";
import Navbar from "components/Layout/Navbar";

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
        <div className="mx-auto min-h-screen max-w-screen-lg">
          <Routes>
            {pages.map(({ path, Component }) => {
              return <Route path={path} element={<Component />} />;
            })}
          </Routes>
        </div>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
