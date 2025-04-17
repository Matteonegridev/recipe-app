import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// fetch all user's saved recipes and return an array of strings (slugs):
const fetchRecipes = async (username: string) => {
  const response = await axios.get(
    `http://localhost:3000/recipes/saved/${username}`,
  );
  console.log("data", response.data);
  const getRecipeSlugs = response.data.savedRecipes;
  console.log("all recipes saved by user are:", getRecipeSlugs);
  return getRecipeSlugs;
};

function useUserSavedRecipes(username: string) {
  return useQuery({
    queryKey: ["saved-recipes", username],
    queryFn: () => fetchRecipes(username),
    enabled: !!username,
  });
}

export default useUserSavedRecipes;
