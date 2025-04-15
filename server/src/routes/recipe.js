import express from "express";
import recipeControllers from "../controllers/recipeControllers.js";
import passport from "passport";

const router = express.Router();

router.post("/create", passport.authenticate("jwt", { session: false }), recipeControllers.createRecipes);
router.get("/:slug", recipeControllers.fetchRecipesIds);
router.put("/", passport.authenticate("jwt", { session: false }), recipeControllers.saveRecipes);

export { router as recipeRouter };
