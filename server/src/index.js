import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import sanitize from "express-mongo-sanitize";
import connectDB from "./database/connect_db.js";
import { usersRouter } from "./routes/users.js";
import cookieParser from "cookie-parser";
import { recipeRouter } from "./routes/recipe.js";
import recipeControllers from "./controllers/recipeControllers.js";

const app = express();
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

connectDB(mongoUri);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "recipeapp",
  })
);
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:5173",
    credentials: true,
  })
);

app.use(sanitize());
app.use(cookieParser());
// generate static files:
app.use(express.static("src/public"));

//Home:
app.get("/", recipeControllers.getRecipes);
// user route:
app.use("/user", usersRouter);
// recipe route:
app.use("/recipes", recipeRouter);

app.listen(port, () => console.log(`server started: http://localhost:${port}`));
