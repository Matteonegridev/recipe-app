import { useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { type Recipes } from "./CreateRecipe";
import { useAuthQuery } from "../hooks/useAuthQuery";

function ReadMore() {
  const { data } = useFetchRecipes();
  const { recipeId } = useParams();
  const { isLogged } = useAuthQuery();

  const fetchOneRecipe = data?.find(
    (recipes: Recipes) => recipes.name === recipeId,
  );

  return (
    <div>
      {fetchOneRecipe ? (
        <div>
          <h2>{fetchOneRecipe.name}</h2>
          <p>{fetchOneRecipe.instructions}</p>
          <p>{fetchOneRecipe.cookingTime}</p>
          {isLogged && (
            <button className="cursor-pointer bg-amber-200">Save Recipe</button>
          )}
        </div>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
}

export default ReadMore;
