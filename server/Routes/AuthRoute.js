// SAFEHER-MAIN/server/Routes/AuthRoute.js (ES Module Syntax)

import { Router } from 'express'; // 1. Import Router using destructuring
import { Signup, Login } from '../Controllers/AuthController.js'; // 2. Import functions & add .js
import { userVerification } from '../Middlewares/AuthMiddleware.js'; // 3. Import function & add .js

const router = Router(); // 4. Initialize Router

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/', userVerification);

export default router; // 5. Use export default