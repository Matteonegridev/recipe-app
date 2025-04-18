import express from "express";
import recipeControllers from "../controllers/recipeControllers.js";
import passport from "passport";
import { uploadMiddleware } from "../middleware/uploadImage.js";

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  uploadMiddleware,
  recipeControllers.createRecipes
);
router.get("/:userId", recipeControllers.fetchRecipesIds);
router.get("/saved/:username", recipeControllers.checkUserSavedRecipes);
router.put("/", passport.authenticate("jwt", { session: false }), recipeControllers.saveRecipes);

export { router as recipeRouter };
