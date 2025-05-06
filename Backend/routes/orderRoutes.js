import express from "express";
import {
  getOrders,
  addOrderItems,
  getMyOrders,
  getOrdersById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderControllers.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

//using constroller
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrdersById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

//added authmidddleware like protect to access when user is login && added protect & admin both to get access when the user is login & user is admin

export default router;
