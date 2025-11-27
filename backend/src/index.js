import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to Mongo
connectDB();

// Static uploads fallback
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
app.use("/uploads", express.static(uploadPath));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
