import mongoose from "mongoose";

const connectDB = (url) => {
  try {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("database is connected"));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
