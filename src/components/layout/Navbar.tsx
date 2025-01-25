import { Button } from "@components/common";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { page } from "types/pages";

const Navbar = (props: { pages: page[] }) => {
  const { pages } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
      console.log("Scrolled:", isScrolled); // Debugging log
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClasses = classNames(
    "fixed w-full font-mono text-white transition-colors duration-300",
    {
      "bg-zinc-900/50": !scrolled,
      "bg-zinc-900": scrolled || menuOpen,
    }
  );

  return (
    <nav className={navClasses}>
      {/* Mobile menu button, logo, and desktop menu (actual navbar) */}
      <div className="flex items-center px-2 md:px-6 lg:px-12 max-w-screen-lg mx-auto">
        <div className="sm:hidden absolute left-4">
          <Button icon={faBars} onClick={toggleMenu} />
        </div>
        <div className="flex w-full justify-center items-center sm:justify-evenly">
          <Logo />
          <DesktopMenu pages={pages} menuOpen={menuOpen} />
        </div>
      </div>
      {/* Mobile menu (displayed on entire screen when button is clicked) */}
      <MobileMenu pages={pages} menuOpen={menuOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

const Logo = () => (
  <div className="flex flex-shrink-0">
    <img
      className="h-16 w-auto p-2"
      src={"/graphics/logo_512.svg"}
      alt="logo"
    />
  </div>
);

interface DesktopMenuProps {
  pages: page[];
  menuOpen: boolean;
}

const DesktopMenu = ({ pages, menuOpen }: DesktopMenuProps) => {
  function getDesktopLinkClasses({ isActive }: { isActive: boolean }) {
    return classNames(
      "text-lg px-4 py-2 underline-offset-8",
      "transition duration-300",
      "hover:underline hover:text-cyan-500",
      {
        underline: isActive,
      }
    );
  }

  return (
    <div className="hidden sm:block flex-grow px-6">
      <div className="flex flex-row justify-evenly">
        {pages.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={getDesktopLinkClasses}
          >
            {"[ " + page.name + " ]"}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

interface MobileMenuProps {
  pages: page[];
  menuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu = ({ pages, menuOpen, toggleMenu }: MobileMenuProps) => {
  const menuClasses = classNames(
    "sm:hidden overflow-hidden w-full",
    "backdrop-blur-lg bg-zinc-950/50",
    "transition-all duration-300",
    { "h-screen": menuOpen, "h-0": !menuOpen }
  );

  function getMobileLinkClasses({ isActive }: { isActive: boolean }) {
    return classNames("text-2xl mx-5 py-5 text-white text-center", {
      "bg-cyan-950/90": isActive,
      "bg-cyan-950/50 hover:bg-cyan-950/70": !isActive,
    });
  }

  return (
    <div className={menuClasses}>
      <div className="flex flex-col gap-1 py-2">
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.path}
            className={getMobileLinkClasses}
            onClick={toggleMenu}
          >
            {page.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
