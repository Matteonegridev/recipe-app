import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { Link } from "react-router";

function Saved() {
  const { data } = useAuthQuery();

  const [savedRecipes, setSavedRecipes] = useState<
    { _id: string; slug: string }[]
  >([]);

  console.log("data:", data);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `http://localhost:3000/recipes/${data?.username}`,
        {
          withCredentials: true,
        },
      );
      console.log("recipes:", res.data);
      console.log("save:", res.data?.savedRecipes);
      setSavedRecipes(res.data.savedRecipes || []);
    })();
  }, [data?.username]);

  return (
    <div>
      <h1>Your Recipes</h1>
      <ul className="space-y-2">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <li
              key={recipe?._id}
              className="rounded-lg border bg-white p-4 shadow"
            >
              <h2 className="text-lg font-semibold">
                {recipe?.slug
                  ?.replace(/-/g, " ")
                  .split(" ")
                  .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                  .join(" ")}
              </h2>
              <Link to={`/saved-recipes/${recipe._id}`}>View Recipe</Link>
            </li>
          ))
        ) : (
          <p> No recipes saved!</p>
        )}
      </ul>
    </div>
  );
}

export default Saved;
