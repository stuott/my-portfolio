import { Page } from "types/index";
import Education from "./education/Education";
import Home from "./home/Home";
import DiceRoller from "./projects/DiceRoller";
import DnDSpells from "./projects/DnDSpells";
import Projects from "./projects/Projects";
import RecipeList from "./projects/RecipeList";
import Sudoku from "./sudoku/Sudoku";

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
  },
];

export { pages };
