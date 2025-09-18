import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import path from "path";
dotenv.config();
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads"))
);
// mount
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);

// Error handler
app.use(errorHandler);

export default app;
