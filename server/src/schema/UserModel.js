import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
