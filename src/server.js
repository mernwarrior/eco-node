import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
//import orderRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";
dotenv.config();
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads"))
);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// mount

//app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
// Error handler
app.use(errorHandler);

export default app;
