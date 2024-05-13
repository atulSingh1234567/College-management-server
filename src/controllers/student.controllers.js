import { Student } from "../models/student.models.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";

export const addStudent = async (req,res,next)=>{
       const student = req.body;
       console.log(req.file)
       // await uploadOnCloudinary(req.file.path)
       console.log(student);
}