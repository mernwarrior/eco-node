import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Attach routes without applying protect globally
app.use("/api/user", userRoutes);

// Error handler
app.use(errorHandler);

export default app;
