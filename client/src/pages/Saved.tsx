import { useEffect, useState } from "react";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { Link } from "react-router";
import api from "../lib/axios";

function Saved() {
  const { data } = useAuthQuery();

  const [savedRecipes, setSavedRecipes] = useState<
    { _id: string; slug: string }[]
  >([]);
  // const [isOpen, setIsOpen] = useState(false);

  console.log("data:", data);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/${data?.username}`);
      console.log("recipes:", res.data);
      console.log("save:", res.data?.savedRecipes);
      setSavedRecipes(res.data.savedRecipes || []);
    })();
  }, [data?.username]);

  return (
    <div className="mt-30 px-14 max-sm:px-8">
      <h1 className="font-header mb-8 text-center text-6xl font-bold">
        Your Recipes
      </h1>
      <ul className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((recipe) => (
            <li
              key={recipe?._id}
              className="tranistion-all relative cursor-pointer space-y-2 overflow-clip rounded-lg bg-white p-4 shadow duration-150 ease-in hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="font-accents text-4xl font-bold">
                {recipe?.slug
                  ?.replace(/-/g, " ")
                  .split(" ")
                  .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                  .join(" ")}
              </h2>
              {/* <button onClick={() => setIsOpen(!isOpen)}>open</button> */}
              <Link
                className="text-secondary-sandyBrown"
                to={`/saved-recipes/${recipe._id}`}
              >
                View Recipe
              </Link>
              <div className="bg-primary-green pointer-events-none absolute right-0 bottom-0 h-25 w-25 translate-x-5 translate-y-5 rounded-full opacity-30 blur-2xl"></div>
            </li>
          ))
        ) : (
          <p> No recipes saved!</p>
        )}
      </ul>
      {/* {isOpen && <ModalRecipe />} */}
    </div>
  );
}

export default Saved;
