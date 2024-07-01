import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
import { File } from "../models/files.js";

dotenv.config({
        path: './.env'
   }) 
console.log(process.env.API_KEY);
const cloud_name=process.env.cloud_name;
const api_key=process.env.API_KEY;
const api_secret=process.env.API_SECRET;
cloudinary.config({
    cloud_name:"dhk1v7s3d",
    api_key: "254493958599184",
    api_secret:"-KVgbSmDOdEkXYW-uIAw529_2t0"
});


const uploadOnCloudinary = async (path) => {
    try {
        if (!path) return null;
        
        const response = await cloudinary.uploader.upload(path, {
            resource_type: "auto",
            folder: "Uploaded Files"
        });
        
        // Delete the local file after successful upload
        await fs.promises.unlink(path);
        
        console.log("File uploaded successfully");
        console.log(response);
        return response;
    } catch (err) {
        console.error("Error uploading file to Cloudinary:", err);
        return null;
    }
};

const deleteOnCloudinary = async (secure_url) => {
    try {
        if (!secure_url) return null;
        console.log(secure_url);
        const FileToBeDeleted=await File.findOne({fileURL:secure_url});
        console.log(FileToBeDeleted);
        const publicId=FileToBeDeleted.publicID;
        // const publicId = (secure_url).split("/").pop().split(".")[0];
        
        const response = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        
        return response;
    } catch (error) {
        console.error("Error deleting image file on Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };
