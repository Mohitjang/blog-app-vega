import express from "express";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
