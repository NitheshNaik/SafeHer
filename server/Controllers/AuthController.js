// SAFEHER-MAIN/server/Controllers/AuthController.js

import User from "../Models/UserModel.js"; // 1. Use import and add .js extension
import { createSecretToken } from "../util/SecretToken.js"; // 2. Use import and add .js extension
import bcrypt from "bcryptjs"; // 3. Use import for package

// --- REVISED SIGNUP (ESM Export) ---
export const Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Use status 400 for client-side errors
            return res.status(400).json({ message: "User already exists" });
        }

        // Note: Mongoose pre-save middleware should handle password hashing
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);

        // Set the cookie with necessary security options
        // Use consistent cross-site settings for both Login and Signup
        res.cookie("token", token, {
            httpOnly: true,
            path: '/',
            // These settings are for cross-site communication (e.g., frontend on 3000, backend on 4000)
            secure: true, 
            sameSite: 'None', 
            maxAge: 3 * 24 * 60 * 60 * 1000, 
        });

        // Send the final response
        return res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });

    } catch (error) {
        console.error(error);
        // Add a generic error response
        return res.status(500).json({ message: "Internal server error" });
    }
};


// --- REVISED LOGIN (ESM Export) ---
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // 1. Find User
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        // 2. Compare Password
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password or email' });
        }

        // 3. Create Token and Set Cookie
        const token = createSecretToken(user._id);
        
        // Use the same cross-site cookie settings as Signup for consistency
        res.cookie("token", token, {
            httpOnly: true, // MUST be true for security
            path: '/',
            secure: true, 
            sameSite: 'None', 
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days lifetime
        });

        // Send the final response
        return res.status(200).json({ message: "User logged in successfully", success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};