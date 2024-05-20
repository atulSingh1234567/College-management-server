import { Admin } from "../models/admin.models.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";

const generateAccessAndRefreshTokens = async function(userId){
    const admin = await Admin.findById(userId);
    const accessToken = await admin.generateAccessToken();
    const refreshToken = await admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({validateBeforeSave : false})

    return {accessToken , refreshToken}
}

export const loginAdmin = async function(req , res){
     const {email , password} = req.body;
     const admin = await Admin.findOne({email});

     if(!admin){
        return res.status(404).json({
            message: "Email not registered!"
        })
     }

     const isPasswordValid = await admin.isPasswordCorrect(password);
     console.log(isPasswordValid)
     if(!isPasswordValid){
        return res.status(400).json({
            message: "Password incorrect!"
        })
     }

     const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(admin._id);

     const data = await Admin.findById(admin._id).select("-password -refreshToken");

     return res.cookie('accessToken' , accessToken, {
     httpOnly: true,
     sameSite: "lax"
   }).json({
    data,
    accessToken,
    refreshToken,
    message: 'admin loggedin successfully'
   });
}

//add admin route
export const addAdmin = async function(req , res){
    try {
        const {email , password} = req.body;
        console.log(req.body)
        if(!email || !password){
            return res.status(401).json({
                message: "email or password is not given"
            })
        }
    
        const addedAdmin = await Admin.create({
            email,
            password
        })
    
        return res.status(200).json({
            message: "Admin added",
            addedAdmin
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error,
            message: 'error while adding admin'
        })
    }
}

// profile photo router

export const uploadProfilePhoto = async function(req , res){
     try {
        const imgPath = req.file;
        console.log(imgPath)
        const imgurl = await uploadOnCloudinary(imgPath.path);
        console.log(imgurl);
        if(imgurl){
            const admin = await Admin.findById(req.admin._id);
            admin.imgurl = imgurl.secure_url

            await admin.save({validateBeforeSave : false})
            const profilePhotoURL = imgurl.secure_url;
            return res.status(200).json({
                profilePhotoURL,
                message: 'Profile photo has been set'
            })
        }
     } catch (error) {
           return res.status(500).json({
            error,
            message: 'Error while setting profile photo'
           })
     }
}

// change password

export const changePassword = async (req,res)=>{
    try {
        const {newpassword} = req.body;
        const admin = await Admin.findById(req.admin._id);
        console.log('new password' , newpassword)
        admin.password = newpassword;
        await admin.save({validateBeforeSave: false});

        return res.status(200).json({
            message: 'Password updated successfully'
        })
    } catch (error) {
        console.log(error)
    }
}

// deleting admin
export const deleteAdmin = async (req,res)=>{
    try {
        const {_id} = req.body;
        await Admin.delete({_id})

        return res.status(200).json({
            message: 'Admin has been removed'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error while removing Admin'
        })
    }
}


// get admin
export const getLoggedInAdmin = async (req,res)=>{
     try {
        const {_id} = req.admin
        const admin =  await Admin.findById(_id);
        console.log(admin)
        return res.status(200).json({
            admin
        })
     } catch (error) {
        return res.status(404).json({
            error,
            message: 'Admin not found'
        })
     }
}


// private route
export const addMainAdmin = async function(req,res){
    const {email , password} = req.body;
    const response = await Admin.create({
        email,
        password
    })

    return res.status(200).json({
        message: "main admin added successfully",
        response
    })

}