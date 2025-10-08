import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, // e.g., "card", "paypal"
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      required: true,
    },
    transactionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
