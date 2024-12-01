import { Page } from "types/index";
import Education from "./education/Education";
import Home from "./home/Home";
import DiceRoller from "./projects/DiceRoller";
import DnDSpells from "./projects/DnDSpells";
import Projects from "./projects/Projects";
import RecipeList from "./projects/RecipeList";
import Sudoku from "./sudoku/Sudoku";
import TestView from "./TestView";

enum backgrounds {
  NONE = "bg-transparent",
  DARK = "bg-zinc-900",
  LIGHT = "bg-zinc-800",
  MAP = "bg-map",
  CUBE = "bg-cube",
  SUDOKU = "bg-sudoku",
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
    path: "/projects/dice-roller",
    name: "Dice Roller",
    Component: DiceRoller,
    showInNavbar: false,
  },
  {
    path: "/projects/spellbook",
    name: "D&D Spellbook",
    Component: DnDSpells,
    showInNavbar: false,
  },
  {
    path: "/sudoku",
    name: "Sudoku",
    Component: Sudoku,
    showInNavbar: true,
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
