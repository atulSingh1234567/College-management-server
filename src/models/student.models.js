import mongoose, { Schema } from "mongoose";

const studentSchema = Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type :String,
    },
    rollno: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }

})

export const Student = mongoose.model('Student' , studentSchema);