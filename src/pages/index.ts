import { page } from "types/pages";
import BookPage from "./books/BookPage";
import Books from "./books/Books";
import Education from "./Education";
import Home from "./Home";
import Project from "./projects/Project";
import Projects from "./projects/Projects";
import RecipeList from "./projects/RecipeList";
import Sudoku from "./projects/Sudoku";
import TestView from "./TestView";
import DiceRoller from "./tools/DiceRoller";
import DnDSpells from "./tools/DnDSpells";

enum backgrounds {
  NONE = "bg-transparent",
  DARK = "bg-zinc-900",
  LIGHT = "bg-zinc-800",
  MAP = "bg-map",
  CUBE = "bg-cube",
  SUDOKU = "bg-sudoku",
  INTERSECT = "bg-intersect",
}

const pages: page[] = [
  { path: "/", name: "Home", Component: Home, showInNavbar: true },
  {
    path: "/education",
    name: "Education",
    Component: Education,
    showInNavbar: true,
  },
  {
    path: "/projects/",
    name: "Projects",
    Component: Projects,
    showInNavbar: true,
    background: backgrounds.CUBE,
  },
  {
    path: "/project/:index",
    name: "Project",
    Component: Project,
    showInNavbar: false,
    background: backgrounds.CUBE,
  },
  {
    path: "/recipe-list",
    name: "Recipe List",
    Component: RecipeList,
    showInNavbar: false,
  },
  {
    path: "/sudoku",
    name: "Sudoku",
    Component: Sudoku,
    showInNavbar: false,
    background: backgrounds.SUDOKU,
  },
  {
    path: "/books/",
    name: "Books",
    Component: Books,
    showInNavbar: false,
    background: backgrounds.INTERSECT,
  },
  {
    path: "/book/:isbn13",
    name: "Book",
    Component: BookPage,
    showInNavbar: false,
    background: backgrounds.INTERSECT,
  },
  {
    path: "/dice-roller",
    name: "Dice Roller",
    Component: DiceRoller,
    showInNavbar: false,
  },
  {
    path: "/spellbook",
    name: "D&D Spellbook",
    Component: DnDSpells,
    showInNavbar: false,
  },
  {
    path: "/test-view",
    name: "Test View",
    Component: TestView,
    showInNavbar: false,
  },
];

export { pages };
