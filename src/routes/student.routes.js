import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { addStudent } from "../controllers/student.controllers.js";


const router = Router();
router.route('/add-student').post(upload.single('url'), addStudent);

export default router