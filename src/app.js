import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))// to handle json data
app.use(express.urlencoded({extended: true, limit: "16kb"}))// to handle liinks 
app.use(express.static("public"))// to handle static files fur assets 
app.use(cookieParser())// to handle cookies

//routes import 

import userRouter from './routes/user.routes.js'


//routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/users/register

export {app}