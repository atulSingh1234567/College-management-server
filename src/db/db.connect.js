import mongoose from "mongoose";

export const connectDB = async ()=>{
    
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/placementCellServer`)
        console.log("mongoDB connected!!!!")
    } catch (error) {
        console.log("mongoDB connection error "+ error);
    } 
}
