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
      setRecipes((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "cookingTime") {
      setRecipes((prev) => ({ ...prev, cookingTime: parseInt(value) }));
    } else {
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
    <div className="mt-20 py-10">
      <h2 className="font-header mt-10 text-center text-5xl font-bold">
        Create Recipes
      </h2>
      <main className="mt-15">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="m-auto flex w-3/4 flex-col space-y-5 p-3 shadow-lg"
        >
          <div>
            <Input
              placeholder="Recipe's name"
              label="Name"
              type="text"
              id="name"
              name="name"
              value={recipes.name}
              onChange={handleChange}
            />
            {fieldError.name && (
              <p className="text-xs text-red-500">{fieldError.name}</p>
            )}
          </div>
          <div className="flex flex-col space-y-5">
            {recipes.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  placeholder={`Ingredient`}
                  label={`Ingredient ${index + 1}`}
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  value={ingredient}
                  className="w-[25rem] rounded-md border px-1 py-2"
                  onChange={(e) => handleChangeAddedIngredient(e, index)}
                />
                <button
                  className="ml-auto cursor-pointer bg-red-500 px-3 py-2 text-white"
                  type="button"
                  onClick={() => removeIngredient(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="text-mg cursor-pointer rounded-md bg-amber-200 py-2 font-bold shadow-md"
            >
              Add Ingredient
            </button>
          </div>
          <div>
            <Textarea
              placeholder="Mix it, cook it, eat it."
              label="Instructions"
              id="instructions"
              name="instructions"
              value={recipes.instructions}
              onChange={handleChange}
            />
            {fieldError.instructions && (
              <p className="text-xs text-red-500">{fieldError.instructions}</p>
            )}
          </div>
          <div>
            <Input
              label="Select an Image"
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/jpeg, image/jpg"
              onChange={handleChange}
            />
            {fieldError.imageUrl && (
              <p className="text-xs text-red-500">{fieldError.imageUrl}</p>
            )}
          </div>
          <div>
            <Input
              label="Cooking time"
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={recipes.cookingTime}
              onChange={handleChange}
            />
            {fieldError.cookingTime && (
              <p className="text-xs text-red-500">{fieldError.cookingTime}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="creator"
              label="Owner"
              type="text"
              id="userOwner"
              name="userOwner"
              value={recipes.userOwner}
              onChange={handleChange}
            />
            {fieldError.userOwner && (
              <p className="text-xs text-red-500">{fieldError.userOwner}</p>
            )}
          </div>
          <button className="cursor-pointer bg-gray-300" type="submit">
            Add Recipe
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateRecipe;
