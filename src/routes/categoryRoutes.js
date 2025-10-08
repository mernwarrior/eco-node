import express from "express";
//import * as categoryCtrl from "../controllers/categoryController.js";
import {
  updateCategory,
  listCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
} from "../controllers/categoryController.js";

import { uploadFile } from "../utils/upload.js";
import { categoryValidation } from "../validations/categoryValidation.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
const uploadSubCategoryImage = uploadFile("categories");
// Create category (multipart/form-data with field name 'image' OR JSON with imageUrl)
router.post(
  "/",
  uploadSubCategoryImage.single("image"),
  validate(categoryValidation),
  
  createCategory
);
// Update (image optional)
router.put(
  "/:id",
  uploadSubCategoryImage.single("image"),
 
  validate(categoryValidation),
  updateCategory
);
router.get("/",  listCategories);
router.get("/:id",  getCategoryById);
router.delete("/:id", deleteCategory);

export default router;
