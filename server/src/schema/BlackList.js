// import mongoose from "mongoose";
// import User from "./UserModel.js";

// const BlacklistSchema = new mongoose.Schema(
//   {
//     token: {
//       type: String,
//       required: true,
//       ref: User,
//     },
//     expiresAt: {
//       type: Date,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// BlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// const Blacklist = mongoose.model("Blacklist", BlacklistSchema);
// export default Blacklist;
