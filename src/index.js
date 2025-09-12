import connectDB  from "./db/index.js";


import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})



connectDB()




















// import express from "express";
// const app = express()
// ( async() => {
//     try{
//         await mongoose.connect(`${process.env.MONGOOSE_URI}/${DB_NAME}`);
//         app.on("error",() => {
//             console.log("Error in connecting to the server");
//             throw error
//         })

//         app.listen(process.env.port, () => {
//             console.log(`App is listening on port ${process.env.port}`);
//         })
//     }
//     catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// })();