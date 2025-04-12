import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../schema/UserModel.js";

const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
    console.log(token);
  }
  return token;
};

// JWT authentication token:
const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const findUser = await User.findById(jwtPayload.id);
      console.log(findUser);

      if (findUser) {
        return done(null, findUser);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
