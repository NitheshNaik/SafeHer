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



  // chatbot
 const GEMINI_API_KEY = ""; 
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION = "You are a concise, supportive chatbot focused on women's empowerment and safety, specifically with reference to the context of India. Respond briefly and directly to the user's query, prioritizing helpful facts and resources. Keep your answer to 2-3 sentences max.";

const allowedKeywords = [
  // Basic Conversation
  "hello", "hi", "hey", "how are you", "what's up", "help", "thanks", "thank you", "bye", "goodbye",
  // Women Empowerment & Safety (Expanded)
  "women", "woman", "harassment", "rights", "security", "safety",
  "gender", "education", "self defense", "empowerment",
  "women health", "abuse", "violence", "domestic", "support",
  "equality", "leadership", "mentorship", "career", "financial",
  "discrimination", "workplace", "glass ceiling", "consent",
  "legal aid", "hotline", "resources", "advocacy", "pay gap",
  "maternity", "fertility", "representation", "sexual assault"
];

app.post("/api/chat", async (req, res) => {
  const message = req.body.message.toLowerCase();

  // Check if the message contains any of the allowed keywords
  const isRelated = allowedKeywords.some((k) => message.includes(k));

  if (!isRelated) {
    return res.json({
      reply: "This chatbot only answers women's empowerment, safety, and general greeting related questions. Please try a different topic."
    });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
        // Apply the instruction for concise responses
        systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
        }
      })
    });

    if (!response.ok) {
        // Log the error response from the API if the status code is not 200-299
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        return res.status(response.status).json({
             reply: "Error communicating with the Gemini API. Check server logs." 
        });
    }

    const data = await response.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't get a meaningful response from the model.";

    res.json({ reply: botReply });

  } catch (error) {
    console.error("Fetch or processing error:", error);
    res.status(500).json({ reply: "An internal server error occurred." });
  }
});

// --- 4. Server Start ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});