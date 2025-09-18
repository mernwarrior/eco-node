import Joi from "joi";

export const categoryValidation = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot be longer than 50 characters",
    "any.required": "Name is required",
  }),

  image: Joi.string().messages({
    "string.empty": "Image is required",
    "any.required": "Image is required",
  }),
  description: Joi.string().min(5).max(200).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description cannot be longer than 200 characters",
    "any.required": "Description is required",
  }),
});

export const subcategoryValidation = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot be longer than 50 characters",
    "any.required": "Name is required",
  }),

  categoryId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Category ID is required",
      "string.pattern.base": "Invalid Category ID format",
      "any.required": "Category ID is required",
    }),

  image: Joi.string().allow("").messages({
    "string.empty": "Image is required",
  }),

  description: Joi.string().min(5).max(200).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters long",
    "string.max": "Description cannot be longer than 200 characters",
    "any.required": "Description is required",
  }),
});
