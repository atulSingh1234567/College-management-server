import { Job } from "../models/job.models.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";

export const addJobToDB = async function(req,res){
    try {
        const file = req.file;
        const {role,company,ctc,googleURL,aboutCompany} = req.body;
        console.log(req.body)
    
        const description = await uploadOnCloudinary(file.path,'raw');
        console.log(description);
        
        if(description){
            const response = await Job.create({
                role,company,ctc,googleURL,aboutCompany,
                description: description.secure_url
            })

            return res.status(200).json({
                response,
                message: 'Job has been posted'
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error,
            message: 'error while posting the job'
        })
    }
}

export const deleteJob = async (req,res)=>{
    try {
        const {_id} = req.body;
        await Job.delete({_id})
        return res.status(200).json(
            {
                message: 'Job is removed'
            }
        )
    } catch (error) {
        return res.status(500).json({
            message: "Error while removing Job"
        })
    }
}