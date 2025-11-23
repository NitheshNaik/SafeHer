// SAFEHER-MAIN/server/Routes/aiRoutes.js

import { Router } from 'express'; // 1. Use Router destructuring for clarity
import { upload } from '../Middlewares/multerConfig.js'; // 2. IMPORT THE NAMED EXPORT 'upload'
import * as aiController from '../Controllers/aiController.js'; // 3. Import controller functions

const router = Router(); // Initialize the router instance

// Define the POST route for file upload and scanning
// The 'upload.single('file')' middleware MUST be successfully imported for this route to be defined.
// The key 'file' must match the FormData key used by the frontend.
router.post('/scan', upload.single('file'), aiController.scanBreastImage);

export default router; // Export the router instance