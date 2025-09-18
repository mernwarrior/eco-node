// src/controllers/userController.js
import userService from "../services/userService.js";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    // console.log("testhere");
    const data = await userService.registerUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const data = await userService.loginUser(req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const resendOTPController = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await userService.resendOTP(email);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: error.message, data: null });
  }
};

// Verify OTP
export const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await userService.verifyOTP(email, otp);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: error.message, data: null });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const data = await userService.getProfile(req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// // ✅ Get User Profile (protected)
// export const getProfile = async (req, res) => {
//   if (req.user) {
//     res.json({
//       _id: req.user._id,
//       name: req.user.name,
//       email: req.user.email,
//     });
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// };
