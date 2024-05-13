import {Router} from 'express';
import { loginAdmin,addMainAdmin,addAdmin } from '../controllers/admin.controllers.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route("/admin-login").post(loginAdmin)
// secure routes
router.route("/add-admin").post(verifyJWT , addAdmin)



// secret route
router.route("/add-main-admin").post(addMainAdmin);

export default router;