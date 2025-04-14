import { Link } from "react-router";
// import { useAuth } from "../hooks/useAuth";
import { useAuthQuery } from "../hooks/useAuthQuery";

function Navbar() {
  const { logout, isLogged } = useAuthQuery();
  return (
    <header className="w-full">
      <nav className="m-[0_auto] w-3/4 py-4">
        <ul className="flex gap-16 [&>*]:text-2xl [&>*]:font-semibold [&>*]:uppercase">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/create-recipe"}>Create</Link>
          </li>
          <li>
            <Link to={"/saved-recipe"}>Save</Link>
          </li>
          <li>
            <Link to={"/auth"}>Login/Register</Link>
          </li>
          {isLogged && (
            <button
              onClick={logout}
              className="ml-auto cursor-pointer bg-amber-300 px-4 py-1"
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
