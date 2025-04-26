import { Link, useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { type Recipes } from "./CreateRecipe";
import { useAuthQuery } from "../hooks/useAuthQuery";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import useSaveRecipe from "../hooks/useSaveRecipe";
import useUserSavedRecipes from "../hooks/useUserSavedRecipes";

function ReadMore() {
  // creazione del params:
  const { recipeId } = useParams();
  // fetch del recipe:
  const { data: recipeData } = useFetchRecipes();
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
    <div className="mx-auto mt-30 w-full max-w-4xl rounded-lg bg-white p-10 py-5 shadow-xl">
      <div className="mb-8" aria-label="link">
        <Link className="text-secondary-sandyBrown" to={"/"}>
          Back
        </Link>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-accents text-primary-green text-5xl font-bold">
          {fetchOneRecipe.name}
        </h2>
        {isLogged && (
          <button
            onClick={() => saveRecipe(fetchOneRecipe.slug)}
            className="transition-transform duration-200 hover:scale-110"
          >
            {isSaved ? (
              <BookmarkIcon
                fontSize="large"
                className="text-secondary-sandyBrown cursor-pointer"
              />
            ) : (
              <BookmarkOutlinedIcon
                fontSize="large"
                className="cursor-pointer text-gray-400"
              />
            )}
          </button>
        )}
      </div>

      <section className="mb-6">
        <h4 className="mb-2 text-2xl font-semibold">🧂 Ingredients</h4>
        <ul className="ml-5 list-disc space-y-1 text-lg">
          {fetchOneRecipe.ingredients.map((ing: string, i: number) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="mb-2 text-2xl font-semibold">📜 Instructions</h4>
        <p className="text-lg whitespace-pre-line">
          {fetchOneRecipe.instructions}
        </p>
      </section>

      <section>
        <h4 className="mb-2 text-2xl font-semibold">⏱️ Cooking Time</h4>
        <p className="text-lg">{fetchOneRecipe.cookingTime}</p>
      </section>
    </div>
  );
}

export default ReadMore;
