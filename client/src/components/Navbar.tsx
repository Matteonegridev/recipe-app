import { Link, useLocation } from "react-router";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "./Button";

function Navbar() {
  const { logout, isLogged } = useAuthQuery();
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  const path = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 w-full transition-all duration-350 ease-in",
        {
          "bg-primary-green shadow-lg": !path || (path && isScrolling),
          "bg-transparent": path && !isScrolling,
        },
      )}
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
            <Button
              navTo="/auth"
              label="Login"
              className="border-secondary-accent-1 font-body w-[8rem] cursor-pointer rounded-xl border py-2 text-xl font-bold text-white"
            />
          )}
          {isLogged && (
            <button
              onClick={logout}
              className="bg-secondary-sandyBrown w-[8rem] cursor-pointer rounded-lg py-2 text-xl font-bold text-white"
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
