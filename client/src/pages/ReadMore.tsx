import { useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { type Recipes } from "./CreateRecipe";
import { useAuthQuery } from "../hooks/useAuthQuery";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import useSaveRecipe from "../hooks/useSaveRecipe";
import useUserSavedRecipes from "../hooks/useUserSavedRecipes";

function ReadMore() {
  // fetch del recipe:
  const { data: recipeData } = useFetchRecipes();
  // creazione del params:
  const { recipeId } = useParams();
  // dati relativi all'utente:
  const { isLogged, data: userData } = useAuthQuery();
  // dati della mutation:
  const { mutate: saveRecipe } = useSaveRecipe(userData?.username || "");
  // fetch recipes salvati dell'utente considerato:
  const { data: savedRecipes = [] } = useUserSavedRecipes(
    userData?.username || "",
  );

  // Find the corrisponding recipe to the recipeId params we navigate to:
  const fetchOneRecipe = recipeData?.find(
    (recipes: Recipes) => recipes.slug === recipeId || recipes._id === recipeId,
  );

  const isSaved = savedRecipes.includes(recipeId);

  // console.log("DATA:", recipeData);
  // console.log("recipe ID:", recipeId);
  // console.log("online?", isLogged);
  // console.log("user?", userData, userData?.savedRecipes);
  // console.log("fetch One Recipe:", fetchOneRecipe);

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
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              {isSaved ? (
                <BookmarkIcon fontSize="large" className="text-yellow-500" />
              ) : (
                <BookmarkOutlinedIcon
                  fontSize="large"
                  className="text-gray-500"
                />
              )}
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
