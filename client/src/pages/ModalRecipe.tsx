import { useParams } from "react-router";
import useFetchRecipes from "../hooks/useFetchRecipes";
import { Recipes } from "./CreateRecipe";

function ModalRecipe() {
  const { data } = useFetchRecipes();
  const { recipeId } = useParams();

  const fetchOneRecipe = data?.find(
    (recipes: Recipes) => recipes._id === recipeId,
  );

  console.log(fetchOneRecipe.name);

  return (
    <div>
      <p>{fetchOneRecipe.name}</p>
      <p>{fetchOneRecipe.ingredients}</p>
      <p>{fetchOneRecipe.instructions}</p>
      <p>{fetchOneRecipe.cookingTime}</p>
    </div>
  );
}

export default ModalRecipe;
