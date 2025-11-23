// SAFEHER-MAIN/server/Controllers/aiController.js

import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch'; // Ensure node-fetch is installed (v2 or v3)

// Wrap the logic into a controller function
export const scanBreastImage = async (req, res) => {
    // Multer has already run at this point (in the route handler)
    try {
        // 1. Check if the file was received
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }
        const filePath = req.file.path;

        // 2. Create FormData object for forwarding
        const form = new FormData();
        // The key 'file' must match what the ML service expects
        form.append("file", fs.createReadStream(filePath)); 

        // 3. Forward the request to ML service
        const mlResponse = await fetch("http://localhost:8000/predict/file", {
            method: "POST",
            body: form,
            headers: form.getHeaders() // CRITICAL for multipart/form-data
        });

        // 4. Check for non-200 responses from ML service
        if (!mlResponse.ok) {
            const errorText = await mlResponse.text();
            console.error(`ML Service Error (${mlResponse.status}):`, errorText);
            fs.unlinkSync(filePath); // Delete file on failure
            return res.status(502).json({ error: "ML Service processing failed" });
        }

        // 5. Get result and clean up
        const result = await mlResponse.json();
        fs.unlinkSync(filePath); // Cleanup file after successful processing
        res.json(result);

    } catch (err) {
        // Log the error and handle file cleanup if it exists during the error
        console.error("AI Controller Error:", err);
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path); 
        }
        res.status(500).json({ error: "Server error during file processing" });
    }
};