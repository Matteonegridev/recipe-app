import { useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { type Recipes } from "./CreateRecipe";
import { useAuthQuery } from "../hooks/useAuthQuery";
import axios from "axios";
import { toast } from "react-toastify";

function ReadMore() {
  const { data } = useFetchRecipes();
  const { slugId } = useParams();
  const { isLogged } = useAuthQuery();

  // Find the corrisponding recipe:
  const fetchOneRecipe = data?.find(
    (recipes: Recipes) => recipes.slug || recipes._id === slugId,
  );

  const saveRecipe = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/recipes`,
        { slugId },
        { withCredentials: true },
      );

      toast.success(res.data.message || "Recipe saved!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error("Something went wrong while saving the recipe.");
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
