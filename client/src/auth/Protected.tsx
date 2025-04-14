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
      <div className="mt-10 text-center">
        <p>You must be logged in to see this page.</p>
        <Link to="/auth" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}

export default Protected;
