import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Saved from "./pages/Saved";
import CreateRecipe from "./pages/CreateRecipe";
import Navbar from "./components/Navbar";
import ReactQueryContext from "./context/ReactQueryContext";
import Protected from "./auth/Protected";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ReactQueryContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
        </ReactQueryContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
