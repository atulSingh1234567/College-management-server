import { Student } from "../models/student.models.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";

export const addStudent = async (req,res,next)=>{
       try {
              const {name,role,rollno,batch,course,company,ctc} = req.body;
              console.log(req.body)
              const file = req.file
              const url = await uploadOnCloudinary(file.path)
              console.log(url)

              if(url){
                     const response = await Student.create({
                           name,role,rollno,batch,course,company,ctc,
                           url: url.secure_url
                     })

                     return res.status(200).json({
                            response,
                            message: 'Student is added'
                     })
              }
              else{
                     return res.status(500).json(
                            {
                                   message: 'error while uploading image to server'
                            }
                     )
              }
              
       } catch (error) {
              return res.status(500).json({
                     error,
                     message: 'Student could not be added'
              })
       }
}