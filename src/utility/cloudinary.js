import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

          
cloudinary.config({ 
    cloud_name: 'dbfwrunmv', 
    api_key: '392676588311384', 
    api_secret: '55C6isqxyiWDI92USjgCoAyFzeA' 
  });

const uploadOnCloudinary = async (localFilePath,pdfitis)=>{
    try {
        
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : `${pdfitis || 'auto'}`
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log('an error occured while uploading on cloudinary' + error)
        return null
    }
}


export {uploadOnCloudinary};