import { Page } from "types/index";
import Education from "./education/Education";
import Home from "./home/Home";
import DiceRoller from "./projects/DiceRoller";
import Projects from "./projects/Projects";
import RecipeList from "./projects/RecipeList";

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
];

export { pages };
