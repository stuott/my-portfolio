import { NavLink } from "react-router-dom";
import { Page } from "types";

function Navbar(props: { pages: Page[] }) {
  const { pages } = props;

  function getLinkClasses(props: { isActive: boolean }) {
    const { isActive } = props;
    return `${
      isActive ? "bg-cyan-700/20" : ""
    } text-lg px-4 py-2 transition hover:bg-cyan-700`;
  }

  return (
    <>
      <header className="mx-auto text-white bg-zinc-900 fixed top-0 h-16 w-full z-50">
        <nav className="px-2 py-2 flex justify-evenly">
          {pages.map(({ path, name, showInNavbar }) => {
            return (
              <>
                {showInNavbar ? (
                  <NavLink to={path} className={getLinkClasses}>
                    {name}
                  </NavLink>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </nav>
      </header>
      <div className="h-16 bg-zinc-900"></div>
    </>
  );
}

export default Navbar;
