// SAFEHER-MAIN/server/Middlewares/AuthMiddleware.js

import User from '../Models/UserModel.js'; // 1. Use import and add .js extension
import jwt from 'jsonwebtoken';         // 2. Use import for jwt
import 'dotenv/config';                  // 3. Use ESM import for dotenv

// --- userVerification (ESM Export) ---
// Note: We use 'export const' to provide the named export that AuthRoute.js is expecting.
export const userVerification = (req, res) => {
    // Set headers to explicitly disable caching for this verification endpoint
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    
    // 1. Get the token from cookies
    const token = req.cookies.token; 
    
    // Check 1: If no token exists, fail verification immediately
    if (!token) {
        // Return explicit status: false
        return res.status(200).json({ status: false }); 
    }

    // 2. Verify the token
    // IMPORTANT: Replace 'YOUR_SECRET_KEY_FALLBACK' with a real fallback value if needed
    jwt.verify(token, process.env.TOKEN_KEY || 'YOUR_SECRET_KEY_FALLBACK', async (err, data) => { 
        
        // Check 2: If the token is invalid or expired
        if (err) {
            // Return explicit status: false
            return res.status(200).json({ status: false });
        } else {
            // 3. Find the user based on the ID stored in the token payload (data.id)
            try {
                // Assuming your payload stores the user ID in data.id
                // Use .lean() for faster read operations if you don't need Mongoose methods
                const user = await User.findById(data.id).lean(); 
                
                // Check 3: If user exists, verification is successful
                if (user) {
                    // Success! Return status: true and user data with HTTP 200 OK
                    return res.status(200).json({ 
                        status: true, 
                        user: user.username, 
                        email: user.email 
                    });
                } else {
                    // User ID was valid, but user doesn't exist in DB (unlikely)
                    return res.status(200).json({ status: false });
                }
            } catch (dbError) {
                console.error("Database error during verification:", dbError);
                return res.status(500).json({ status: false, message: "Database error" });
            }
        }
    });
};