import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  createProductValidation,
  updateProductValidation,
  idValidation,
  listProductValidation,
} from "../validations/productValidation.js";
import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  listProducts,
} from "../controllers/productController.js";

const router = express.Router();
// Example usage
router.post("/", validate(createProductValidation), protect, createProduct);
router.get(
  "/",
  validate(listProductValidation, "query"),
  protect,
  listProducts
);
router.get("/:id", validate(idValidation, "params"), protect, getProductById);
router.put("/:id", validate(updateProductValidation), protect, updateProduct);
router.delete("/:id", validate(idValidation, "params"), protect, deleteProduct);
export default router;
