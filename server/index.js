// index.js (ES Module Syntax)

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config"; // 💡 Standard way to load .env in ESM (replaces require("dotenv").config())
import cookieParser from "cookie-parser";
// Ensure these local route files use default exports and are named with .js extension
import authRoute from "./Routes/AuthRoute.js"; 
import smsRoute from "./Routes/smsRoute.js";
import aiRoutes from './Routes/aiRoutes.js';

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000; // 💡 It's convention to use all caps for environment variables like PORT

// --- 1. Middleware Setup (Execute BEFORE app.listen) ---
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Essential for sending cookies/tokens
  })
);
app.use(cookieParser());
app.use(express.json()); // Essential for parsing JSON request bodies

// --- 2. Route Middleware ---
app.use("/", authRoute);
app.use("/api", smsRoute);
app.use('/api/ai', aiRoutes);

// --- 3. Database Connection ---
mongoose.connect(MONGO_URL, {
    // useNewUrlParser: true, // Deprecated/Ignored
    // useUnifiedTopology: true, // Deprecated/Ignored
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));


// --- 4. Server Start ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});