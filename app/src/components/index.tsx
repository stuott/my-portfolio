import { Page } from "types/index";
import Education from "./education/Education";
import Home from "./home/Home";
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
];

export { pages };
