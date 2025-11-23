const express = require("express");
const router = express.Router();
const twilio = require("twilio");

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

    const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`;

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

module.exports = router;
