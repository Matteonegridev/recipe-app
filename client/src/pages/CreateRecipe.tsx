import { useState } from "react";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import _ from "lodash";
import axios from "axios";
import { useNavigate } from "react-router";
import { Types } from "mongoose";
import validateRecipeSchema, {
  RecipeValidation,
} from "../schema/validateRecipe";

export type Recipes = {
  _id?: Types.ObjectId;
  slug?: string;
  name: string;
  ingredients: string[];
  instructions: string;
  imageUrl: File | null;
  cookingTime: number;
  userOwner: string;
};

function CreateRecipe() {
  const [recipes, setRecipes] = useState<
    Omit<RecipeValidation, "imageUrl"> & { imageUrl: File | null }
  >({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: null,
    cookingTime: 0,
    userOwner: "",
  });
  const [fieldError, setFieldError] = useState<{
    name?: string;
    ingredients?: string[];
    instructions?: string;
    imageUrl?: string;
    cookingTime?: string;
    userOwner?: string;
  }>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "imageUrl" && files) {
      // handle file:
      setRecipes((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "cookingTime") {
      // handle number:
      setRecipes((prev) => ({ ...prev, cookingTime: parseInt(value) }));
    } else {
      // All the other values:
      setRecipes((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Aggiungi ingredient con Lodash:
  const addIngredient = () => {
    setRecipes((prev) => ({
      ...prev,
      // _.uniq con lodash permette di aggiungere solo valori non esistenti:
      ingredients: _.uniq([
        ...prev.ingredients,
        `Ingredient ${prev.ingredients.length + 1}`,
      ]),
    }));
  };

  // Rimuovi ingredient:
  const removeIngredient = (index: number) => {
    const removedIngredient = recipes.ingredients.filter((_, i) => i !== index);
    setRecipes((prev) => ({ ...prev, ingredients: removedIngredient }));
  };

  // Consenti al field ingredient di essere modificato:
  const handleChangeAddedIngredient = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    const updateIngredient = recipes.ingredients.map((ingredient, i) =>
      i === index ? value : ingredient,
    );
    setRecipes((prev) => ({ ...prev, ingredients: updateIngredient }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = validateRecipeSchema.safeParse(recipes);

    if (validationResult.success) {
      try {
        const response = await axios.post(
          "http://localhost:3000/recipes/create",
          { ...recipes },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          },
        );
        navigate("/");
        console.log(response.data);
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
      }
    } else {
      const errors = validationResult.error.flatten();
      console.log("Errori recipes:", errors);
      setFieldError({
        name: errors.fieldErrors.name?.[0],
        ingredients: errors.fieldErrors.ingredients,
        instructions: errors.fieldErrors.instructions?.[0],
        imageUrl: errors.fieldErrors.imageUrl?.[0],
        cookingTime: errors.fieldErrors.cookingTime?.[0],
        userOwner: errors.fieldErrors.userOwner?.[0],
      });
    }
  };

  return (
    <div className="bg-primary-accent-1 mt-20 py-10">
      <h2 className="font-header mt-10 text-center text-5xl font-bold text-gray-600">
        Create a recipe!
      </h2>
      <main className="mt-15">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="m-auto flex w-2xl flex-col items-center space-y-5 rounded-lg bg-white py-8 shadow-xl"
        >
          <Input
            error={fieldError.name}
            placeholder="Recipe's name"
            label="Name"
            type="text"
            id="name"
            name="name"
            value={recipes.name}
            onChange={handleChange}
          />

          <div className="w-[35rem]">
            {recipes.ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between pb-4">
                <Input
                  error={fieldError.ingredients}
                  placeholder={`Ingredient`}
                  label="Ingredients"
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  value={ingredient}
                  className="outline-secondary-sandyBrown shadow-secondary-sandyBrown w-[25rem] rounded-md border-none px-2 py-3 text-xl shadow-sm"
                  onChange={(e) => handleChangeAddedIngredient(e, index)}
                />
                <button
                  className="flex h-11 w-11 cursor-pointer items-center justify-center self-end rounded-full bg-red-400 text-xl font-bold text-white"
                  type="button"
                  onClick={() => removeIngredient(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addIngredient}
            className="bg-secondary-accent-1 w-[35rem] grow cursor-pointer rounded-md py-2 text-lg font-bold shadow-md"
          >
            Add Ingredient
          </button>
          <Textarea
            error={fieldError.instructions}
            placeholder="Mix it, cook it, eat it."
            label="Instructions"
            id="instructions"
            name="instructions"
            value={recipes.instructions}
            onChange={handleChange}
          />

          <Input
            error={fieldError.imageUrl}
            label="Select an Image"
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/jpeg, image/jpg"
            className="file:bg-secondary-accent-1 hover:file:bg-primary-accent-2 w-[35rem] rounded-md border-none py-2 text-lg outline-none file:mr-4 file:cursor-pointer file:rounded-lg file:px-4 file:py-2 file:text-lg file:font-semibold file:text-black file:shadow-md file:transition-all file:duration-150 file:ease-in"
            onChange={handleChange}
          />

          <Input
            error={fieldError.cookingTime}
            label="Cooking time"
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipes.cookingTime}
            onChange={handleChange}
          />

          <Input
            error={fieldError.userOwner}
            placeholder="creator"
            label="Creator's name"
            type="text"
            id="userOwner"
            name="userOwner"
            value={recipes.userOwner}
            onChange={handleChange}
          />

          <button
            className="bg-secondary-accent-1 w-[35rem] cursor-pointer rounded-lg py-2 text-lg font-bold shadow-md"
            type="submit"
          >
            Add Recipe
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateRecipe;
