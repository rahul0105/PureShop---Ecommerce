import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productcontroller.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

//using this way also work
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     getProducts();
//   })
// );

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     getProductById();
//   })
// );

//using constroller
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
