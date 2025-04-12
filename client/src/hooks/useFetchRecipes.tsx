import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRecipes = async () => {
  const response = await axios.get("http://localhost:3000/home");
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
