import express from "express";
import { uploadFile } from "../utils/upload.js";
import {
  createSubCategory,
  listSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { subcategoryValidation } from "../validations/categoryValidation.js";
import { validate } from "../middlewares/validateMiddleware.js";

const router = express.Router();
const uploadSubCategoryImage = uploadFile("subcategories");

router.post(
  "/",
  uploadSubCategoryImage.single("image"),
  validate(subcategoryValidation),
  protect,
  createSubCategory
);

router.get("/", protect, listSubCategories);

router.get("/:id", protect, getSubCategory);

router.put(
  "/:id",
  uploadSubCategoryImage.single("image"),
  validate(subcategoryValidation),
  protect,
  updateSubCategory
);

router.delete("/:id", protect, deleteSubCategory);

export default router;
