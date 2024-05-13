import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    package: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String
    },
    googleURL: {
        type: String,
        required: true
    }
})

export const Job = mongoose.model('Job', jobSchema)