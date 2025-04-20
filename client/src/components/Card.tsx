import { Link } from "react-router";
import { type Recipes } from "../pages/CreateRecipe";

function Card({ data }: { data: Recipes[] }) {
  return (
    <>
      {data.map((recipes: Recipes) => (
        <div key={recipes.name} className="rounded-lg bg-white shadow-md">
          {recipes.imageUrl ? (
            <img
              src={`http://localhost:3000${recipes.imageUrl}`}
              alt="Recipe Image"
              className="h-auto w-full rounded-t-lg"
            />
          ) : (
            ""
          )}

          <div className="px-3 py-6">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">Recipe Name:</p>
              <span className="text-lg capitalize"> {recipes.name}</span>
            </div>

            <Link
              className="text-md text-secondary-sandyBrown"
              to={`/recipes/${recipes?.slug || recipes._id}`}
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;
