import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.models.js'

export const verifyJWT = async (req, res, next) => {
    const token = req.cookies?.accessToken || req.body.accessToken || req.headers['authorization'];

    if (!token) {
        return res.status(404).json({message: 'Admin not found'});
    }

    jwt.verify(token || accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decodedInfo) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Unauthorized! Token has expired." });
            }
            return res.status(401).json({ message: "Unauthorized!" });
        }
        const currentAdmin = await Admin.findById(decodedInfo?._id).select("-password -refreshToken");

        if (!currentAdmin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }

        req.admin = currentAdmin;
        next()
    })



}