import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

const fetchRecipes = async () => {
  const response = await api.get(`/home`);
  console.log("data", response.data);
  return response.data;
};

function useFetchRecipes() {
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: fetchRecipes,
  });

  return { data, isLoading };
}

export default useFetchRecipes;
