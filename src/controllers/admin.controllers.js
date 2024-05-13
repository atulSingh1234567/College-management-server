import { Admin } from "../models/admin.models.js";

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
     console.log(password)
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
   }).send(data);
}

//add admin route
export const addAdmin = async function(req , res){
    const {email , password} = req.body;
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
}

// post a job route



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