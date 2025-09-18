import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  resendOTPController,
  verifyOTPController,
} from "../controllers/userController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  registerValidation,
  loginValidation,
  otpverifyValidation,
  resendotpValidation,
} from "../validations/userValidation.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes – no token required
router.post("/register", validate(registerValidation), registerUser);
router.post("/login", validate(loginValidation), loginUser);
router.post("/verify-otp", validate(otpverifyValidation), verifyOTPController);
router.post("/resend-otp", validate(resendotpValidation), resendOTPController);

// Protected route – token required
router.get("/profile", protect, getProfile);

export default router;
