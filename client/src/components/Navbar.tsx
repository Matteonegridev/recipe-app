import { Link, useLocation, useNavigate } from "react-router";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "./Button";

function Navbar() {
  const { logout, isLogged } = useAuthQuery();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Create", path: "/create-recipe" },
    { label: "Save", path: "/saved-recipe" },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        {
          "bg-primary-green shadow-md": !isHomePage || isScrolling,
          "bg-transparent": isHomePage && !isScrolling,
        },
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-around py-6 lg:justify-between">
        <div className="">
          <Link to="/" className="font-body text-3xl font-bold text-white">
            Recipe
            <span className="text-secondary-sandyBrown font-accents text-4xl">
              Craft
            </span>
          </Link>
        </div>
        {/* Desktop Nav */}
        <ul className="hidden items-center gap-12 text-white lg:flex lg:justify-around">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="font-body hover:text-secondary-sandyBrown text-xl font-medium uppercase"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="max-md:hidden">
          {!isLogged ? (
            <div className="gap-4 lg:flex lg:items-center">
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/auth/login");
                }}
                label="Login"
                className="font-body hover:bg-secondary-sandyBrown hover:border-secondary-sandyBrown w-[8rem] cursor-pointer rounded-xl py-2 text-xl font-bold transition-colors duration-300"
              />
              <Button
                variant="primary"
                onClick={() => {
                  navigate("auth/register");
                }}
                label="Register"
                className="font-body hover:bg-secondary-sandyBrown w-[8rem] cursor-pointer rounded-xl py-2 text-xl font-bold transition-colors duration-300 hover:text-white"
              />
            </div>
          ) : (
            <button
              onClick={logout}
              className="bg-secondary-sandyBrown w-[8rem] cursor-pointer rounded-lg py-2 text-xl font-bold text-white"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 flex flex-col gap-1 lg:hidden"
          aria-label="Toggle Menu"
        >
          <span
            className={clsx(
              "h-1 w-8 bg-white transition-all duration-150 ease-linear",
              isMenuOpen && "translate-y-1 rotate-45",
            )}
          />
          <span
            className={clsx(
              "h-1 w-8 bg-white transition-all duration-150 ease-linear",
              isMenuOpen && "hidden",
            )}
          />
          <span
            className={clsx(
              "h-1 w-8 bg-white transition-all duration-150 ease-linear",
              isMenuOpen && "-translate-y-1 -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <>
        <div
          className={clsx(
            "fixed inset-0 -z-40 bg-black transition-all duration-300 ease-in lg:hidden",
            isMenuOpen ? "opacity-70" : "pointer-events-none opacity-0",
          )}
        ></div>
        <div
          className={clsx(
            "bg-primary-green absolute top-0 w-full p-6 shadow-lg transition-all duration-200 ease-in-out",
            isMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <ul className="mt-12 space-y-6 text-white">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="font-body hover:text-secondary-sandyBrown block text-xl font-medium uppercase"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-4">
            {!isLogged ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigate("/auth/login");
                    setIsMenuOpen(false);
                  }}
                  label="Login"
                  className="w-full py-2 font-bold"
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/auth/register");
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2 font-bold"
                  label="Register"
                />
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="bg-secondary-sandyBrown w-full py-2 text-xl font-bold text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </>
    </header>
  );
}

export default Navbar;
