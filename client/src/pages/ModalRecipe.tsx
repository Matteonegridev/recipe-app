import { Link, useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";

function ModalRecipe() {
  const { recipeId } = useParams();
  const { data: recipeData } = useFetchRecipes();

  // Find by _id or slug
  const actualRecipe = recipeData?.find(
    (recipe: { _id: string; slug?: string }) =>
      recipe._id === recipeId || recipe.slug === recipeId,
  );

  console.log("🍳 All recipes:", recipeData);
  console.log("🧩 Found recipe:", actualRecipe);
  console.log("🧠 ID from route:", recipeId);

  return (
    <div className="mx-auto mt-30 max-w-2xl rounded-lg bg-white p-10 shadow-xl">
      {actualRecipe ? (
        <>
          <Link className="text-secondary-sandyBrown" to={"/saved-recipe"}>
            Back
          </Link>
          <h2 className="font-header my-4 text-4xl font-bold">
            {actualRecipe.name}
          </h2>
          <section className="mb-4">
            <h4 className="mb-2 text-2xl font-semibold">🧂 Ingredients</h4>
            <ul className="ml-5 list-disc">
              {Array.isArray(actualRecipe.ingredients) ? (
                actualRecipe.ingredients.map((ing: string, i: number) => (
                  <li key={i}>{ing}</li>
                ))
              ) : (
                <li>{actualRecipe.ingredients}</li>
              )}
            </ul>
          </section>
          <section className="mb-4">
            <h4 className="mb-2 text-2xl font-semibold">📜 Instructions</h4>
            <p className="whitespace-pre-line">{actualRecipe.instructions}</p>
          </section>
          <section>
            <h4 className="mb-2 text-2xl font-semibold">⏱️ Cooking Time</h4>
            <p>{actualRecipe.cookingTime} min</p>
          </section>
        </>
      ) : (
        <p>No recipe found</p>
      )}
    </div>
  );
}

export default ModalRecipe;
