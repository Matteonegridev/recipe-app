import { Link } from "react-router";
import { type Recipes } from "../pages/CreateRecipe";
import { useInView } from "react-intersection-observer";

function Card({ data }: { data: Recipes[] }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <>
      {data.map((recipes: Recipes) => (
        <div
          ref={ref}
          key={recipes.name}
          className="aspect-[6/4] rounded-lg bg-white shadow-md"
        >
          <img
            src={
              recipes.imageUrl && inView
                ? `http://localhost:3000${recipes.imageUrl}`
                : "./assets/images/default.jpg"
            }
            alt="Recipe Image"
            className="h-full w-full rounded-t-lg object-cover"
          />

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
