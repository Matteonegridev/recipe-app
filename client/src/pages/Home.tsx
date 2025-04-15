import { Link } from "react-router";
import { type Recipes } from "./CreateRecipe";
import useFetchRecipes from "../hooks/useFetchRecipes";

function Home() {
  const { data, isLoading } = useFetchRecipes();

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>Explore Recipes:</h1>
      {data.map((recipes: Recipes) => (
        <div key={recipes.name} className="border">
          <p>Recipe Name: {recipes.name}</p>
          <Link to={`/recipes/${recipes.slug || recipes._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
