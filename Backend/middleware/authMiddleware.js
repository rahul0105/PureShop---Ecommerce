import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/UserModel.js";

//protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the jwt for the cookie
  token = req.cookies.jwt; //jwt is cookie name want to access

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //decode is the object that have payload (userId)

      //req.user-> adding the user to req object // user will be acccess for all the routes
      req.user = await User.findById(decode.userId).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, Token failed!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, No Token!");
  }
});

//Admin middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin!");
  }
};

export { protect, admin };
