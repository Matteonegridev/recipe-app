import Recipe from "../schema/RecipeSchema.js";
import User from "../schema/UserModel.js";
import uuid4 from "uuid4";

const getRecipes = async (req, res) => {
  const recipes = await Recipe.find();

  if (!recipes) {
    res.status(404).json({ message: "Recipe not found" });
  }
  res.status(201).send(recipes);
};

const createRecipes = async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } = req.body;

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
      id: uuid4(),
      name,
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
  const fetchedRecipe = await Recipe.findById(recipeId);
  const fetchedUser = await User.findById(req.body.username);

  try {
    if (fetchedRecipe && fetchedUser) {
      fetchedUser.savedRecipes.push(fetchedRecipe);
    }
    await fetchedUser.save();

    return res.status(201).json({ message: "Recipe save successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    throw new Error(error);
  }
};

// Find saved recipes of a given user:
const fetchRecipesIds = async (req, res) => {
  try {
    const fetchedUser = await User.findById(User._id);
    return res.json({ saveRecipes: fetchedUser?.savedRecipes });
  } catch (error) {
    console.error(error);
  }
};

export default { getRecipes, createRecipes, saveRecipes, fetchRecipesIds };
