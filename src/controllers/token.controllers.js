import jwt from "jsonwebtoken"

export const generateNewRefreshToken = async (req,res)=>{
    const refreshToken = req.headers['authorization']

    if(!refreshToken){
        return res.status(403).json({
            message: 'credentials not matched'
        })
    }

    jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET , async (err, decodedInfo)=>{
        if(err){
            return res.status(403).json({
                message: 'Invalid Refresh Token'
            })
        }

        const accessToken = jwt.sign(
            {
                _id: decodedInfo._id,
                email: decodedInfo.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )

        return res.status(200).json({
            accessToken
        })
    })
}