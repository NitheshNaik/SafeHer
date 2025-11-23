// SAFEHER-MAIN/server/Routes/smsRoute.js

import express from "express"; // 1. Import express
import twilio from "twilio";   // 2. Import twilio

const router = express.Router(); // 3. Initialize Router

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

router.post("/send-sms", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Location not received",
      });
    }

    // 💡 Fix: Ensure the location URL is properly formatted for Google Maps
    const locationUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    const message = await client.messages.create({
      body: `🚨 Emergency Alert!\nLocation: ${locationUrl}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.EMERGENCY_PHONE_NUMBER,
    });

    res.json({
      success: true,
      message: "SMS sent successfully",
      sid: message.sid,
    });

  } catch (error) {
    console.error("Twilio Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Twilio SMS failed",
      error: error.message,
    });
  }
});

export default router; // 4. Use export default