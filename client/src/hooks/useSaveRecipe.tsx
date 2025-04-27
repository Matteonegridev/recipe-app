import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "../lib/axios";

const saveRecipes = async (recipeId: string) => {
  try {
    const res = await api.put(
      `/recipes`,
      { recipeId },
      { withCredentials: true, validateStatus: () => true },
    );
    if (res.status === 200) {
      toast.success(res.data.message || "Recipe saved!");
    } else if (res.status === 409) {
      toast.error(res.data.message || "Recipe already saved!");
    }

    console.log("Response received:", recipeId);
  } catch (error) {
    console.error("Error saving recipe:", error);
    toast.error("Something went wrong while saving the recipe.");
  }
};

// username is the logged user.
function useSaveRecipe(username: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (recipeId: string) => saveRecipes(recipeId),
    mutationKey: ["saved-recipes"],
    onMutate: async (recipeId) => {
      await queryClient.cancelQueries({
        queryKey: ["saved-recipes", username],
      });

      const previousQuery = queryClient.getQueryData(["saved-recipes"]);
      queryClient.setQueryData(
        ["saved-recipes", username],
        (oldData: string) => [...oldData, recipeId],
      );
      return { previousQuery };
    },
    onError: (_err, _recipeId, context) => {
      queryClient.setQueryData(["saved-recipes"], context?.previousQuery);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-recipes"] });
    },
  });

  return mutation;
}

export default useSaveRecipe;
