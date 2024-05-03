import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({
        path: './.env'
    })

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(cookieParser())
app.use("/api/users", userRouter);

const url=process.env.ATLAS_URL;
console.log(url);
const dbconnect= async()=>{
    await mongoose.connect(url,{}).then(()=>{
        console.log('connected')
      }).catch((err)=>{
        console.log(err)
      })
}

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
    dbconnect();
})