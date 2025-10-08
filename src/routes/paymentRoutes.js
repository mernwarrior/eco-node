import express from "express";
import {
  createPayment,
  listPayments,
  getPaymentById,
  deletePayment,
} from "../controllers/paymentController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  createPaymentValidation,
  idValidation,
} from "../validations/paymentValidator.js";

const router = express.Router();

// Create a payment
router.post("/", validate(createPaymentValidation), createPayment);

// List all payments
router.get("/", listPayments);

// Get payment by ID
router.get("/:id", validate(idValidation, "params"), getPaymentById);

// Delete payment by ID
router.delete("/:id", validate(idValidation, "params"), deletePayment);

export default router;
