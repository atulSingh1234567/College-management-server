import jwt from 'jsonwebtoken';
import {Admin} from '../models/admin.models.js'

export const verifyJWT = async (req,res,next)=>{
    const token = req.cookies?.accessToken || req.body.accessToken || req.headers['authorization'];

    if(!token && !accessToken){
        return res.status(401).send('Access token not found');
    }

    const decodedInfo = jwt.verify(token || accessToken , process.env.ACCESS_TOKEN_SECRET)

    const currentAdmin = await Admin.findById(decodedInfo?._id).select("-password -refreshToken");

    if(!currentAdmin){
        return res.status(401).json({
            message: "Invalid Access Token"
        })
    }

    req.admin = currentAdmin;
    next()

}