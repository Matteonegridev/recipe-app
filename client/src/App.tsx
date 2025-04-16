import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Saved from "./pages/Saved";
import CreateRecipe from "./pages/CreateRecipe";
import ReactQueryContext from "./context/ReactQueryContext";
import Protected from "./auth/Protected";
import ReadMore from "./pages/ReadMore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarLayout from "./components/NavbarLayout";
import ModalRecipe from "./pages/ModalRecipe";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ReactQueryContext>
          <Routes>
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:recipeId" element={<ReadMore />} />
              <Route path="/auth" element={<Auth />} />
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
