import { Link, useLocation } from "react-router";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "./Button";

function Navbar() {
  const { logout, isLogged } = useAuthQuery();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
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
      <nav className="mx-auto flex max-w-7xl items-center justify-around py-4">
        <Link to="/" className="font-body text-3xl font-bold text-white">
          Recipe
          <span className="text-secondary-sandyBrown font-accents text-4xl">
            Craft
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-10 text-white sm:flex">
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
        <div className="hidden items-center gap-4 sm:flex">
          {!isLogged ? (
            <>
              <Button
                navTo="/auth/login"
                label="Login"
                className="border-secondary-accent-1 font-body w-[8rem] cursor-pointer rounded-xl border py-2 text-xl font-bold text-white"
              />
              <Button
                navTo="/auth/register"
                label="Register"
                className="bg-secondary-accent-1 font-body w-[8rem] cursor-pointer rounded-xl py-2 text-xl font-bold text-black"
              />
            </>
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
          className="z-50 flex flex-col gap-1 sm:hidden"
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
            "fixed inset-0 -z-40 bg-black transition-all duration-300 ease-in sm:hidden",
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
                  navTo="/auth/login"
                  label="Login"
                  className="border-secondary-accent-1 w-full border py-2 font-bold text-white"
                />
                <Button
                  navTo="/auth/register"
                  label="Register"
                  className="bg-secondary-accent-1 w-full py-2 font-bold text-black"
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
