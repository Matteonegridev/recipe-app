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
import passport from "passport";
import recipeControllers from "./controllers/recipeControllers.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB(mongoUri);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_URL : "http://localhost:5173",
    credentials: true,
  })
);

app.use(sanitize());
// generate static files:
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// app.get("/", (req, res) => {
//   res.send("Welcome to the Recipe App API!");
// });

//Home:
app.get("/home", recipeControllers.getRecipes);
// user route:
app.use("/user", usersRouter);
// recipe route:
app.use("/recipes", recipeRouter);

app.listen(port, () => console.log(`server started: http://localhost:${port}`));
