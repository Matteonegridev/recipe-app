import { Link } from "react-router";
import { type Recipes } from "./CreateRecipe";
import useFetchRecipes from "../hooks/useFetchRecipes";

function Home() {
  const { data, isLoading } = useFetchRecipes();
  console.log(data);

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>Explore Recipes:</h1>
      {data.map((recipes: Recipes) => (
        <div key={recipes.id} className="border">
          <p>Recipe Name: {recipes.name}</p>
          <Link to={`/recipes/${recipes.name}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
