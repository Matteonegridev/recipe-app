import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import "../passport/JWT-strategy.js";
import passport from "../passport/JWT-strategy.js";

const router = express.Router();

router.post("/register", usersControllers.registerUser);
router.post("/login", usersControllers.loginUser);
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found in JWT" });
  }
  const { username } = req.user;
  res.json({ username });
});
router.post("/logout", passport.authenticate("jwt", { session: false }), usersControllers.logoutUser);

export { router as usersRouter };
