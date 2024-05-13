import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './src/db/db.connect.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config({
    path: "./.env"
})

const app = express();

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


import adminRouter from './src/routes/admin.routes.js'
import studentRouter from './src/routes/student.routes.js'
import jobRouter from './src/routes/job.routes.js'

app.use('/api/v1' , adminRouter);
app.use('/api/v1' , studentRouter);
app.use('/api/v1' , jobRouter)

