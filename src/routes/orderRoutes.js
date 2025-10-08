import express from "express";
import {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {
  createOrderValidation,
  updateOrderValidation,
  idValidation,
} from "../validations/orderValidation.js";

const router = express.Router();

router.post("/", validate(createOrderValidation), createOrder);
router.get("/", listOrders);
router.get("/:id", validate(idValidation), getOrderById);
router.put(
  "/:id",
  validate(idValidation),
  validate(updateOrderValidation),
  updateOrder
);
router.delete("/:id", validate(idValidation), deleteOrder);

export default router;
