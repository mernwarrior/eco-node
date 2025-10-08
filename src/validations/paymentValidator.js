import Joi from "joi";

export const createPaymentValidation = Joi.object({
  orderId: Joi.string().hex().length(24).required(),
  amount: Joi.number().min(0).required(),
  paymentMethod: Joi.string().required(),
  paymentStatus: Joi.string().valid("pending", "paid", "failed").required(),
  transactionId: Joi.string().optional(),
});
export const idValidation = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.empty": "ID is required",
    "string.length": "ID must be a valid 24-character MongoDB ID",
    "string.hex": "ID must be a valid hexadecimal string",
    "any.required": "ID is required",
  }),
});
