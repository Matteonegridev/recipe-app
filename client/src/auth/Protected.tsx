import { ReactNode } from "react";

import { Link } from "react-router";
import { useAuthQuery } from "../hooks/useAuthQuery";

type Props = {
  children: ReactNode;
};

function Protected({ children }: Props) {
  const { isLogged } = useAuthQuery();

  if (!isLogged) {
    return (
      <div className="bg-primary-accent-2 flex h-[100dvh] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white px-8 py-16 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800">
            You must be logged in to view this page.
          </h1>

          <Link
            to="/auth/login"
            className="bg-secondary-sandyBrown hover:bg-secondary-sandyBrown/90 block w-full rounded-lg px-6 py-3 text-lg font-semibold text-white shadow-sm transition"
          >
            Login
          </Link>

          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-xl text-gray-700">
              Don’t have an account yet?
            </h2>

            <Link
              to="/auth/register"
              className="bg-primary-green hover:bg-primary-green/90 mt-4 inline-block rounded-lg px-6 py-3 text-lg font-semibold text-white shadow-sm transition"
            >
              Create your account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default Protected;
