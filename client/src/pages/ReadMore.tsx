import { useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { type Recipes } from "./CreateRecipe";
import { useAuthQuery } from "../hooks/useAuthQuery";
import axios from "axios";

function ReadMore() {
  const { data } = useFetchRecipes();
  const { recipeId } = useParams();
  const { isLogged } = useAuthQuery();

  // Find the corrisponding recipe:
  const fetchOneRecipe = data?.find(
    (recipes: Recipes) => recipes._id === recipeId,
  );

  const saveRecipe = async () => {
    try {
      await axios.put(
        `http://localhost:3000/recipes`,
        {
          recipeId,
        },
        { withCredentials: true },
      );
      // inserire toast?
      alert("Recipe saved!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Something went wrong while saving the recipe.");
    }
  };

  return (
    <div>
      {fetchOneRecipe ? (
        <div>
          <h2>{fetchOneRecipe.name}</h2>
          <p>{fetchOneRecipe.instructions}</p>
          <p>{fetchOneRecipe.cookingTime}</p>
          {isLogged && (
            <button
              onClick={saveRecipe}
              className="cursor-pointer bg-amber-200"
            >
              Save Recipe
            </button>
          )}
        </div>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
}

export default ReadMore;
