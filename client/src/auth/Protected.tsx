import { ReactNode } from "react";

import { Link } from "react-router";
import { useAuthQuery } from "../hooks/useAuthQuery";

type Props = {
  children: ReactNode;
};

function Protected({ children }: Props) {
  const { isLogged } = useAuthQuery();

  return (
    <div>
      {isLogged ? children : "you must be logged to see this page"}

      <div>{!isLogged && <Link to={"/auth"}>Login</Link>}</div>
    </div>
  );
}

export default Protected;
