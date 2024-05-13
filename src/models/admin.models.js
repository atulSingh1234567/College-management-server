import { Schema,model } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const adminSchema = Schema({
    email: {
        required: true,
        type: String,
        unique: [true, "email already exists"]
    },
    password: {
        required: true,
        type: String
    },
    refreshToken: {
        type: String
    },
    imgurl: {
        type: String
    }
})

adminSchema.pre('save' , async function(next){
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password, " from userSchema.pre() function");
        next();
    } catch (error) {
        next(error);
    }
})

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

adminSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
adminSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Admin = model('Admin' , adminSchema);