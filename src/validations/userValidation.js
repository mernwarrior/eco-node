import Joi from "joi";

// Register Validation Schema
export const registerValidation = Joi.object({
  fullname: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "any.required": "Name is required",
  }),
  term_and_conditions: Joi.boolean().messages({
    "string.empty": "term_and_conditions is required",
  }),
  phoneNumber: Joi.string().min(3).max(30).required().messages({
    "string.empty": "phoneNumber is required",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

// Login Validation Schema
export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const otpverifyValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  otp: Joi.string().required().messages({
    "string.empty": "otp is required",
    "any.required": "otp is required",
  }),
});

export const resendotpValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
});
