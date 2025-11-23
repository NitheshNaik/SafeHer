// SAFEHER-MAIN/server/Models/UserModel.js

import mongoose from "mongoose"; // 1. Use import for mongoose
import bcrypt from "bcryptjs";   // 2. Use import for bcrypt

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Mongoose Pre-save hook for password hashing
userSchema.pre("save", async function () {
  // Only hash if the password field is being modified/is new
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// 3. Use 'export default' to make the User model the default export.
// This matches the 'import User from "../Models/UserModel.js"' statement 
// in your AuthController.js file.
const User = mongoose.model("User", userSchema);
export default User;