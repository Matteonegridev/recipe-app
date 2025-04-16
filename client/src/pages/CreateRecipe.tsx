import { useState } from "react";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import _ from "lodash";
import axios from "axios";
import { useNavigate } from "react-router";
import { Types } from "mongoose";

export type Recipes = {
  _id?: Types.ObjectId;
  slug?: string;
  name: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  cookingTime: number;
  userOwner: string;
};

function CreateRecipe() {
  const [recipes, setRecipes] = useState<Recipes>({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRecipes((prev) => ({ ...prev, [name]: value }));
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

  // Consenti al field di essere modificato:
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

    try {
      const response = await axios.post(
        "http://localhost:3000/recipes/create",
        { ...recipes },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      navigate("/");
      console.log(response.data);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div>
      <h2>Create Recipes</h2>
      <main>
        <form
          onSubmit={handleSubmit}
          className="m-auto flex w-3/4 flex-col space-y-2 p-3 shadow-lg"
        >
          <Input
            label="Name"
            type="text"
            id="name"
            name="name"
            value={recipes.name}
            onChange={handleChange}
          />
          {recipes.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-4">
              <Input
                label={`Ingredient ${index + 1}`}
                type="text"
                id="ingredients"
                name="ingredients"
                value={ingredient}
                className="w-[25rem] border px-1 py-1.5"
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
            className="cursor-pointer bg-amber-200"
          >
            Add Ingredient
          </button>

          <Textarea
            label="Instructions"
            id="instructions"
            name="instructions"
            value={recipes.instructions}
            onChange={handleChange}
          />
          <Input
            label="Select an Image"
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipes.imageUrl}
            onChange={handleChange}
          />
          <Input
            label="Cooking time"
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipes.cookingTime}
            onChange={handleChange}
          />
          <Input
            label="Owner"
            type="text"
            id="userOwner"
            name="userOwner"
            value={recipes.userOwner}
            onChange={handleChange}
          />
          <button className="cursor-pointer bg-gray-300" type="submit">
            Add Recipe
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateRecipe;
