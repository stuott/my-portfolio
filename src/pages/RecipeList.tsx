import SearchBar from "@components/controls/SearchBar";
import Badges from "@components/display/Badges";
import Section from "@components/layout/Section";
import data from "@data/recipes.json";
import { useEffect, useState } from "react";

interface recipe {
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

const recipeMatchesSearch = (recipe: recipe, search: string) => {
  return (
    recipe.title.toLowerCase().includes(search) ||
    recipe.description.toLowerCase().includes(search) ||
    recipe.tags.some((tag) => tag.toLowerCase().includes(search)) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(search)
    ) ||
    recipe.instructions.some((instruction) =>
      instruction.toLowerCase().includes(search)
    )
  );
};

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(data.recipes);

  const recipeAmount = 5;

  useEffect(() => {
    const filter = filterTerm.toLowerCase();
    const search = searchTerm.toLowerCase();
    setFilteredRecipes(
      data.recipes.filter(
        (recipe) =>
          recipe.tags.some((tag) => tag.toLowerCase().includes(filter)) &&
          recipeMatchesSearch(recipe, search)
      )
    );
  }, [searchTerm, filterTerm]);

  return (
    <>
      <SearchBar
        onSearch={() => {}}
        placeholder="Search for a recipe"
        setSearch={setSearchTerm}
        filters={{
          filters: ["breakfast", "lunch", "dinner", "snack"],
          onFilter: setFilterTerm,
        }}
        className="pt-6"
      />
      <Section>
        {filteredRecipes.length === 0 && (
          <h2 className="text-2xl font-bold text-center">No recipes found</h2>
        )}
        <div className="flex flex-col gap-4">
          {filteredRecipes.slice(0, recipeAmount).map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
        </div>
        {filteredRecipes.length > recipeAmount && (
          <h2 className="text-2xl font-bold text-center">
            Showing the first {recipeAmount} recipes
          </h2>
        )}
      </Section>
    </>
  );
};

const RecipeCard = ({ recipe }: { recipe: recipe }) => {
  return (
    <div className="flex flex-col gap-2 bg-zinc-800 border border-zinc-700 border-2 p-4 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold">{recipe.title}</h3>
      <p className="text-lg">{recipe.description}</p>
      <Badges captions={recipe.tags} />
      <p className="font-bold">Ingredients:</p>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      <p className="font-bold">Instructions:</p>
      <ol className="list-decimal pl-6">
        {recipe.instructions.map((instruction) => (
          <li>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export const pageInfo = {
  path: "/recipe-list",
  name: "Recipe List",
  Component: RecipeList,
  showInNavbar: false,
};
