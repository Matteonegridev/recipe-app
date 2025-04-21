import { Link } from "react-router";
import { type Recipes } from "../pages/CreateRecipe";

function Card({ data }: { data: Recipes[] }) {
  return (
    <>
      {data.map((recipes: Recipes) => (
        <div
          key={recipes.name}
          className="aspect-[6/4] rounded-lg bg-white shadow-md"
        >
          {recipes.imageUrl ? (
            <img
              src={`http://localhost:3000${recipes.imageUrl}`}
              alt="Recipe Image"
              className="h-full w-full rounded-t-lg object-cover"
            />
          ) : (
            <img
              src="./assets/images/default.jpg"
              alt="default cooking image"
              className="h-full w-full rounded-t-lg object-cover"
            />
          )}

          <div className="px-3 py-6">
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold">Recipe Name:</p>
              <span className="font-accents text-primary-green text-4xl capitalize">
                {" "}
                {recipes.name}
              </span>
            </div>

            <Link
              className="text-secondary-sandyBrown font-body text-lg"
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
