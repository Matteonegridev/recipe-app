import { Outlet } from "react-router";
import Navbar from "./Navbar";

function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default NavbarLayout;
