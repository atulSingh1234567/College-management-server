import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { addJobToDB, deleteJob } from "../controllers/job.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.route('/post-job').post(upload.single('description') , addJobToDB)
router.route('/delete-job').post(verifyJWT , deleteJob)

export default router