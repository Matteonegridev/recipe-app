import { useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { type Recipes } from "./CreateRecipe";
import { useAuthQuery } from "../hooks/useAuthQuery";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import useSaveRecipe from "../hooks/useSaveRecipe";
import useUserSavedRecipes from "../hooks/useUserSavedRecipes";

function ReadMore() {
  const { data: recipeData } = useFetchRecipes();
  const { recipeId } = useParams();
  const { isLogged, data: userData } = useAuthQuery();

  const { mutate: saveRecipe } = useSaveRecipe();
  const { data: savedRecipes = [] } = useUserSavedRecipes(
    userData?.username || "",
  );

  // Find the corrisponding recipe to the recipeId params we navigate to:
  const fetchOneRecipe = recipeData?.find(
    (recipes: Recipes) => recipes.slug === recipeId || recipes._id === recipeId,
  );

  const isSaved = savedRecipes.includes(recipeId);

  console.log("DATA:", recipeData);
  console.log("recipe ID:", recipeId);
  console.log("online?", isLogged);
  console.log("user?", userData, userData?.savedRecipes);
  console.log("fetch One Recipe:", fetchOneRecipe);

  return (
    <div>
      {fetchOneRecipe ? (
        <div>
          <h2>{fetchOneRecipe.name}</h2>
          <p>{fetchOneRecipe.instructions}</p>
          <p>{fetchOneRecipe.cookingTime}</p>
          {isLogged && (
            <button
              onClick={() => saveRecipe(fetchOneRecipe.slug)}
              className="cursor-pointer"
            >
              {isSaved ? "Saved ✅" : "Save"}
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
