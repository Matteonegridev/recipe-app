import Recipe from "../schema/RecipeSchema.js";
import User from "../schema/UserModel.js";

const getRecipes = async (req, res) => {
  const recipes = await Recipe.find();

  if (!recipes) {
    res.status(404).json({ message: "Recipe not found" });
  }
  res.status(201).send(recipes);
};

const createRecipes = async (req, res) => {
  const { name, slug, ingredients, instructions, imageUrl, cookingTime, userOwner } = req.body;

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
  const slugId = req.body.slugId;
  const userId = req.user?._id;
  console.dir({ recipeId: slugId, userId: userId }, { depth: null });

  try {
    const fetchedRecipe = await Recipe.findOne({ slug: slugId });
    const fetchedUser = await User.findById(userId);

    if (!fetchedRecipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    // Avoid duplicate entries
    if (!fetchedUser.savedRecipes.includes(slugId)) {
      fetchedUser.savedRecipes.push(slugId);
      await fetchedUser.save();
    } else {
      return res.status(200).json({ message: "Recipe already saved." });
    }

    return res.status(201).json({ message: "Recipe save successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    throw new Error(error);
  }
};

// Find saved recipes of a given user:
const fetchRecipesIds = async (req, res) => {
  const { userId } = req.params;
  try {
    const fetchedUser = await User.findById(userId);

    return res.json({ saveRecipes: fetchedUser?.savedRecipes });
  } catch (error) {
    console.error(error);
  }
};

export default { getRecipes, createRecipes, saveRecipes, fetchRecipesIds };
