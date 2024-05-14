import {Router} from 'express';
import { loginAdmin,addMainAdmin,addAdmin,uploadProfilePhoto, changePassword, deleteAdmin, getLoggedInAdmin } from '../controllers/admin.controllers.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { upload } from '../middlewares/multer.middlewares.js';

const router = Router();

router.route("/admin-login").post(loginAdmin)
// secure routes
router.route("/add-admin").post(verifyJWT, addAdmin)
// profile picture route
router.route("/profile-photo").post(verifyJWT, upload.single('imgurl') , uploadProfilePhoto)
// change password route
router.route("/change-password").post(verifyJWT , changePassword);
// deleting subadmins
router.route("/delete-admin").post(verifyJWT , deleteAdmin);
// get admin
router.route("/get-logged-admin").post(verifyJWT , getLoggedInAdmin);

// secret route
router.route("/add-main-admin").post(addMainAdmin);

export default router;