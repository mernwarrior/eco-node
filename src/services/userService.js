import userRepository from "../repositories/userRepository.js";
import generateToken from "../utils/token.js";
import { sendOTPEmail } from "../utils/email.js";
import generateOTP from "../utils/otp.js";
// const generateOTP = () =>
//   Math.floor(100000 + Math.random() * 900000).toString();
class UserService {
  async registerUser({
    fullname,
    phoneNumber,
    email,
    password,
    term_and_conditions,
    isAdmin = false,
  }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser)
      return { statusCode: 400, message: "User already exists", data: null };

    const user = await userRepository.create({
      fullname,
      phoneNumber,
      email,
      password,
      term_and_conditions,
      isAdmin,
    });

    const accessToken = generateToken(user._id);

    if (user.isAdmin) {
      return {
        statusCode: 200,
        message: "Success",
        data: {
          accessToken,
          user: {
            role: "admin",
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
          },
        },
      };
    }

    // Send OTP for normal users
    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await userRepository.updateById(user._id, { otp, otpExpire });

    await sendOTPEmail(email, otp);

    return {
      statusCode: 200,
      message: "Success, OTP sent to your email",
      data: { token: accessToken },
    };
  }
  async resendOTP(email) {
    const user = await userRepository.findByEmail(email);

    if (!user)
      return { statusCode: 404, message: "User not found", data: null };

    if (user.isVerified) {
      return { statusCode: 400, message: "User already verified", data: null };
    }

    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    await userRepository.updateById(user._id, { otp, otpExpire });

    await sendOTPEmail(email, otp);

    return { statusCode: 200, message: "OTP resent successfully", data: null };
  }

  async verifyOTP(email, enteredOTP) {
    const user = await userRepository.findByEmail(email);
    if (!user)
      return { statusCode: 404, message: "User not found", data: null };

    if (user.isVerified)
      return { statusCode: 400, message: "User already verified", data: null };
    if (user.otp !== enteredOTP)
      return { statusCode: 400, message: "Invalid OTP", data: null };
    if (user.otpExpire < new Date())
      return { statusCode: 400, message: "OTP expired", data: null };

    await userRepository.updateById(user._id, {
      isVerified: true,
      otp: null,
      otpExpire: null,
    });

    return {
      statusCode: 200,
      message: "User verified successfully",
      data: null,
    };
  }

  async loginUser({ email, password }) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return {
        statusCode: 401,
        message: "Invalid email or password",
        data: null,
      };
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return {
        statusCode: 401,
        message: "Invalid email or password",
        data: null,
      };
    }

    const token = generateToken(user._id);

    if (user.isAdmin) {
      // Admin response
      return {
        statusCode: 200,
        message: "Success",
        data: {
          accessToken: token,
          user: {
            _id: user._id,
            role: "admin",
            fullname: user.fullname,
            email: user.email,
          },
        },
      };
    }

    // Normal user response
    return {
      statusCode: 200,
      message: "Login Successfully!",
      data: {
        token,
      },
    };
  }

  async getProfile(req, res) {
    if (req.user) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
}

export default new UserService();
