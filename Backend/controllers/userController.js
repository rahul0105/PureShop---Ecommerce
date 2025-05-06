import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth user & get Token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password!");
  }
});

//@desc Register User
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data!");
  }
});

//@desc Logout user / clear cookie
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  //clEARING THE COOKIE
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).send({ message: "Logged Out Successfully!" });
});

//@desc Get User Profile
//@route GET /api/users/profile
//@access private
const getUsersProfile = asyncHandler(async (req, res) => {
  //as we save user in req as we login then we can access anywhere
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

//@desc Update User Profile
//@route PUT /api/users/profile
//@access private
const updateUsersProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      //we are doingh this as password is hashed we don't want alway to distrub pass
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

//@desc Get Users
//@route GET /api/users
//@access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

//@desc Get User by ID
//@route GET /api/users/:id
//@access private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Errror("User not found!");
  }
});

//@desc DELETE User
//@route DELETE /api/users/:id
//@access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully!" });
  } else {
    res.status(404);
    throw new Errror("User not found!");
  }
});

//@desc UPDATE User
//@route PUT /api/users/:id
//@access private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Errror("User not found!");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsersProfile,
  updateUsersProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
