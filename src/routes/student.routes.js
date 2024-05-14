import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { addStudent, showStudents } from "../controllers/student.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.route('/add-student').post(upload.single('url'), addStudent);
router.route('/show-students').get(showStudents)
export default router