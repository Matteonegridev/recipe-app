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
  console.dir({ recipeId: recipeId, userId: userId }, { depth: null });

  try {
    const fetchedRecipe = await Recipe.findOne({ slug: recipeId });
    const fetchedUser = await User.findById(userId);

    if (!fetchedRecipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    const findDuplicates = fetchedUser.savedRecipes.find((savedRecipe) => savedRecipe.slug === fetchedRecipe.slug);

    // Avoid duplicate entries
    if (!findDuplicates) {
      fetchedUser.savedRecipes.push({ _id: fetchedRecipe._id, slug: fetchedRecipe.slug });
      await fetchedUser.save();
      return res.status(200).json({ message: "Recipe saved successfully!" });
    } else {
      return res.status(409).json({ message: "Recipe already saved." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    throw new Error(error);
  }
};

// Find saved recipes of a given user:
const fetchRecipesIds = async (req, res) => {
  const { userId } = req.params;

  try {
    const fetchedUser = await User.findOne({ username: userId });

    return res.json({ savedRecipes: fetchedUser?.savedRecipes });
  } catch (error) {
    console.error(error);
  }
};

export default { getRecipes, createRecipes, saveRecipes, fetchRecipesIds };
