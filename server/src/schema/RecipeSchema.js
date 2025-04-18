import mongoose from "mongoose";
import slugify from "slugify";

const recipeSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  slug: { type: String, unique: true },
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
    // required: true,
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

// When  .save() a recipe, this function runs first and it will modify the name
recipeSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { strict: true, lower: true });
  next();
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
