import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { addStudent } from "../controllers/student.controllers.js";


const router = Router();
router.route('/add-student').post(upload.single('url'), (req,res,next)=>{
    try {
        console.log(req.file);
        console.log(req.body);
        // Further processing or response sending
        console.log('File uploaded successfully');
      } catch (error) {
        // Handle any errors
        console.error(error);
        // res.status(500).send('Error uploading file');
      }
});

export default router