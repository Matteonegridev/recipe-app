import jwt from "jsonwebtoken";
import genPassword from "../bcrypt/crypto.js";
import User from "../schema/UserModel.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const findUser = await User.findOne({ username });
  try {
    if (findUser) {
      return res.status(400).send("user already exist");
    }

    const hashPassword = genPassword(password);
    const createUser = new User({ username, password: hashPassword });
    const saveUser = await createUser.save();
    return res.status(200).send({ message: "user registered successfully" });
  } catch (error) {
    return res.status(400).send({ message: "Wrong entries:", error });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // find the user:
  const user = await User.findOne({ username });

  try {
    if (!user) {
      return res.status(400).json({ username: "User not Found" });
    }

    // check if password matches:
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ password: "Invalid Password" });

    // generate token auth jwt:
    const payload = {
      id: user._id,
      username: user.username,
    };

    const signToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });

    // JWT come cookie:
    res
      .cookie("token", signToken, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 20 * 60 * 1000,
      })
      .json({ message: "login successful" });

    // JWT nell'header:
    // res.status(200).json({
    //   message: "Login successful",
    //   token: "Bearer " + signToken,
    // });
  } catch (error) {
    res.status(500).json({ message: "server error:", error });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Successfully logged out" });
};

export default { registerUser, loginUser, logoutUser };
