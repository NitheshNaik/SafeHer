const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
// Ensure this path is correct to your .env file if it's not handled in index.js
require('dotenv').config(); 

module.exports.userVerification = (req, res) => {
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
        // Return explicit status: false (This is what the frontend expects)
        return res.status(200).json({ status: false }); 
    }

    // 2. Verify the token
    // IMPORTANT: Replace 'YOUR_SECRET_KEY' with the actual variable holding your JWT secret
    jwt.verify(token, process.env.TOKEN_KEY || 'YOUR_SECRET_KEY_FALLBACK', async (err, data) => { 
        
        // Check 2: If the token is invalid or expired
        if (err) {
            // Return explicit status: false
            return res.status(200).json({ status: false });
        } else {
            // 3. Find the user based on the ID stored in the token payload (data.id)
            try {
                // Assuming your payload stores the user ID in data.id
                const user = await User.findById(data.id); 
                
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