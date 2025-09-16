import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/userValidation.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes – no token required
router.post("/register", validate(registerValidation), registerUser);
router.post("/login", validate(loginValidation), loginUser);

// Protected route – token required
router.get("/profile", protect, getProfile);

export default router;
