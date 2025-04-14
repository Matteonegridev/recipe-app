import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  ],
  instructions: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  cookingTime: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
