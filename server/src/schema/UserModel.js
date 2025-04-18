import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  savedRecipes: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
      slug: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
