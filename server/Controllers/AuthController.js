const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// --- REVISED SIGNUP ---
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // Use status 400 for client-side errors
      return res.status(400).json({ message: "User already exists" });
    }
    
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);

    // Set the cookie with necessary security options
 // In AuthController.js (Login and Signup functions)

res.cookie("token", token, {
    httpOnly: true,
    // The Path is CRITICAL. It ensures the browser sends the cookie 
    // to ALL requests on the server, not just a subdirectory.
    path: '/', 
    
    // Setting secure: true AND sameSite: 'None' is the only reliable way 
    // to force browsers to accept cross-site cookies, even on HTTP, 
    // provided you set the Chrome/Firefox flags as previously instructed.
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


// --- REVISED LOGIN ---
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if(!email || !password ){
      return res.status(400).json({message:'All fields are required'});
    }
    
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({message:'Incorrect password or email' }); 
    }
    
    const auth = await bcrypt.compare(password,user.password);
    if (!auth) {
      return res.status(401).json({message:'Incorrect password or email' }); 
    }
    
    const token = createSecretToken(user._id);
    
    // Set the cookie with necessary security options
    res.cookie("token", token, {
      httpOnly: true, // MUST be true for security
      sameSite: 'Lax', // Recommended for development
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days lifetime
    });
    
    // Send the final response
    return res.status(200).json({ message: "User logged in successfully", success: true });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}