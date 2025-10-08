import Joi from "joi";

export const createOrderValidation = Joi.object({
  userId: Joi.string().required(), // ✅ allow userId
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        price: Joi.number().required(),
      })
    )
    .required(),
  totalPrice: Joi.number().required(),
  status: Joi.string()
    .valid("pending", "paid", "shipped", "delivered", "cancelled")
    .default("pending"),
  paymentStatus: Joi.string()
    .valid("pending", "paid", "failed")
    .default("pending"),
  shippingAddress: Joi.string().optional(),
});

export const updateOrderValidation = Joi.object({
  status: Joi.string()
    .valid("pending", "paid", "shipped", "cancelled")
    .optional(),
});

export const idValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
