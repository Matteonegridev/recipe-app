import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import CreateRecipe from "./pages/CreateRecipe";
import ReactQueryContext from "./context/ReactQueryContext";
import Protected from "./auth/Protected";
import ReadMore from "./pages/ReadMore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarLayout from "./components/NavbarLayout";
import ModalRecipe from "./pages/ModalRecipe";
import Login from "./auth/Login";
import Register from "./auth/Register";
import useFetchRecipes from "./hooks/useFetchRecipes";
import Loading from "./components/Loading";

function App() {
  const { isLoading } = useFetchRecipes();

  if (isLoading) return <Loading />;
  return (
    <div className="">
      <BrowserRouter>
        <ReactQueryContext>
          <Routes>
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:recipeId" element={<ReadMore />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/create-recipe"
                element={
                  <Protected>
                    <CreateRecipe />
                  </Protected>
                }
              />
              <Route
                path="/saved-recipe"
                element={
                  <Protected>
                    <Saved />
                  </Protected>
                }
              />
              <Route
                path="/saved-recipes/:recipeId"
                element={<ModalRecipe />}
              />
            </Route>
          </Routes>
        </ReactQueryContext>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default App;
