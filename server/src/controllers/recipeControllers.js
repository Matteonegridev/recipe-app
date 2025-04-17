import Recipe from "../schema/RecipeSchema.js";
import User from "../schema/UserModel.js";
import slugify from "slugify";

const getRecipes = async (req, res) => {
  const recipes = await Recipe.find();

  if (!recipes) {
    res.status(404).json({ message: "Recipe not found" });
  }
  res.status(201).send(recipes);
};

const createRecipes = async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } = req.body;
  const slug = slugify(name, { lower: true, strict: true });

  try {
    const user = await User.findOne({ username: userOwner });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipes = await Recipe.findOne({ name });

    if (recipes) {
      return res.status(409).json({ message: "Recipe already exists" });
    }

    const create = new Recipe({
      name,
      slug,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      userOwner: user._id,
    });
    const saveRecipe = await create.save();
    console.log(saveRecipe);

    return res.status(201).json({ message: "Recipe successfully created!" });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Save recipes into user's profile. (savedRecipe array)
const saveRecipes = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user?._id;

  try {
    // Find Recipe:
    const fetchedRecipe = await Recipe.findOne({ slug: recipeId });
    if (!fetchedRecipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    // Find User:
    const fetchedUser = await User.findById(userId);
    if (!fetchedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if recipe is already saved:
    const isAlreadySaved = fetchedUser.savedRecipes.some((recipe) => recipe?.slug === fetchedRecipe.slug);

    // Unsave if already saved:
    if (isAlreadySaved) {
      // UNSAVE
      fetchedUser.savedRecipes = fetchedUser.savedRecipes.filter((r) => r?.slug !== fetchedRecipe.slug);
    } else {
      // SAVE
      fetchedUser.savedRecipes.push({
        _id: fetchedRecipe._id,
        slug: fetchedRecipe.slug,
      });
    }

    await fetchedUser.save();

    return res.status(200).json({
      message: isAlreadySaved ? "Recipe unsaved!" : "Recipe saved!",
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// This function is important to return only the recipes saved by user:
const checkUserSavedRecipes = async (req, res) => {
  const { username } = req.params;
  try {
    const checkUser = await User.findOne({ username: username });

    if (checkUser) {
      return res.status(200).json({ savedRecipes: checkUser?.savedRecipes.map((recipe) => recipe.slug) });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Find saved recipes of a given user: (Save Section)
const fetchRecipesIds = async (req, res) => {
  const { userId } = req.params;

  try {
    const fetchedUser = await User.findOne({ username: userId });

    return res.json({ savedRecipes: fetchedUser?.savedRecipes });
  } catch (error) {
    console.error(error);
  }
};

export default { getRecipes, createRecipes, saveRecipes, fetchRecipesIds, checkUserSavedRecipes };
