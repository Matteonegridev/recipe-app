import { Link } from "react-router";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useEffect, useState } from "react";

function Navbar() {
  const { logout, isLogged } = useAuthQuery();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("moved");

      if (window.scrollY > 100) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    });
  }, []);

  return (
    <header
      className={`fixed top-0 w-full ${isScrolling ? "bg-primary-green shadow-lg" : "bg-transparent"} transition-all duration-350 ease-in`}
    >
      <nav className="m-[0_auto] flex w-3/4 items-center justify-around py-8">
        <div>
          <h1 className="font-body text-4xl font-bold text-white">
            Recipe
            <span className="text-secondary-sandyBrown font-accents text-5xl">
              Craft
            </span>
          </h1>
        </div>
        <ul className="[&>*]:font-body flex grow justify-center gap-32 text-white [&>*]:text-xl [&>*]:font-medium [&>*]:uppercase">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/create-recipe"}>Create</Link>
          </li>
          <li>
            <Link to={`/saved-recipe`}>Save</Link>
          </li>
        </ul>
        <ul className="">
          {!isLogged && (
            <Link
              className="border-secondary-accent-1 font-body cursor-pointer rounded-xl border px-10 py-2 text-xl font-bold text-white"
              to={"/auth"}
            >
              Login
            </Link>
          )}
          {isLogged && (
            <button
              onClick={logout}
              className="cursor-pointer bg-amber-300 px-4 py-1"
            >
              Logout
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
