import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { addJobToDB } from "../controllers/job.controllers.js";

const router = Router();
router.route('/post-job').post(upload.single('description') , addJobToDB)

export default router