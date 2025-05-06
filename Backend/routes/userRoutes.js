import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUsersProfile,
  updateUsersProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

//using constroller
router.route("/").post(registerUser).get(protect, admin, getUsers);
//since using one method to logout so will use only POST no route.
router.post("/logout", protect, logoutUser);
router.post("/login", authUser);

router
  .route("/profile")
  .get(protect, getUsersProfile)
  .put(protect, updateUsersProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

//added authmidddleware like protect to access when user is login && added protect & admin both to get access when the user is login & user is admin

export default router;
