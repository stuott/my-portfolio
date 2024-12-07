import { Page } from "types/index";
import BookReviews from "./books/BookReviews";
import Education from "./education/Education";
import Home from "./home/Home";
import Projects from "./projects/Projects";
import RecipeList from "./projects/RecipeList";
import Sudoku from "./sudoku/Sudoku";
import TestView from "./TestView";
import DiceRoller from "./tools/DiceRoller";
import DnDSpells from "./tools/DnDSpells";
import InterestCalculator from "./tools/InterestCalculator";
import LoanCalculator from "./tools/LoanCalculator";
import Tools from "./tools/Tools";

enum backgrounds {
  NONE = "bg-transparent",
  DARK = "bg-zinc-900",
  LIGHT = "bg-zinc-800",
  MAP = "bg-map",
  CUBE = "bg-cube",
  SUDOKU = "bg-sudoku",
  INTERSECT = "bg-intersect",
}

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
    background: backgrounds.CUBE,
  },
  {
    path: "/projects/recipe-list",
    name: "Recipe List",
    Component: RecipeList,
    showInNavbar: false,
  },
  {
    path: "/projects/sudoku",
    name: "Sudoku",
    Component: Sudoku,
    showInNavbar: false,
    background: backgrounds.SUDOKU,
  },
  {
    path: "/projects/book-reviews",
    name: "Book Reviews",
    Component: BookReviews,
    showInNavbar: false,
    background: backgrounds.INTERSECT,
  },
  {
    path: "/tools",
    name: "Tools",
    Component: Tools,
    showInNavbar: true,
    background: backgrounds.CUBE,
  },
  {
    path: "/tools/dice-roller",
    name: "Dice Roller",
    Component: DiceRoller,
    showInNavbar: false,
  },
  {
    path: "/tools/spellbook",
    name: "D&D Spellbook",
    Component: DnDSpells,
    showInNavbar: false,
  },
  {
    path: "/tools/loan-calculator",
    name: "Loan Calculator",
    Component: LoanCalculator,
    showInNavbar: false,
    background: backgrounds.SUDOKU,
  },
  {
    path: "/tools/interest-calculator",
    name: "Interest Calculator",
    Component: InterestCalculator,
    showInNavbar: false,
    background: backgrounds.SUDOKU,
  },
  {
    path: "/test-view",
    name: "Test View",
    Component: TestView,
    showInNavbar: false,
  },
];

export { pages };
