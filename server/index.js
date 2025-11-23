// index.js (UPDATED CODE)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
// const { MONGO_URL, PORT } = process.env;
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.port || 4000;

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