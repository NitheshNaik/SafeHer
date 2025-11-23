// SAFEHER-MAIN/server/util/SecretToken.js

import 'dotenv/config'; // 1. Use ESM import for dotenv
import jwt from "jsonwebtoken"; // 2. Use import for jwt

// 3. Use 'export const' to create a named export that the controller is expecting
export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60, // 3 days
  });
};