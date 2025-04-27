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
                ? `${import.meta.env.VITE_API_URL}${recipes.imageUrl}`
                : "/assets/images/default.jpg"
            }
            alt="Recipe Image"
            className="h-full w-full rounded-t-lg object-cover"
          />

          <div className="px-3 py-6">
            <div className="w-full text-pretty">
              <h5 className="mb-2 text-4xl font-bold">Recipe Name:</h5>
              <p className="font-accents text-primary-green mb-1 text-4xl capitalize">
                {recipes.name}
              </p>
            </div>
            <Link
              className="text-secondary-sandyBrown font-body text-md hover:text-orange-600"
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
