import axios from "axios"
import path from "path"
import fs from "fs"
import { User } from "../models/user.js";
import { File } from "../models/files.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import multer from "multer";
import { upload } from "../middlewares/multer.js";
import { uploadOnCloudinary,deleteOnCloudinary } from "../utils/cloudinary.js";

const getFiles=async(req,res)=>{
    try{
        const {email}=req.body;
        const user =await User.findOne({email:email});
        console.log(user)
        const files=await File.find({});
        res.status(200).json({files,user});
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

const uploadFiles=async(req,res)=>{
    
        try{
            
            const {email} =req.body;
            const user=await User.findOne({email:email});
             if(user.role===2001){
                const response=await uploadOnCloudinary(req.files?.NewFile[0]?.path);
            
                const newFile=[{
                    fileName:response.original_filename,
                    fileURL:response.secure_url,
                    publicID:response.public_id,
                    userId:user._id,
                    department: user.department,
                    size:response.bytes
                }];
                File.insertMany(newFile).then((res)=>{console.log(res);});
                res.status(200).json("File Successfully Uploaded")
            }
    }
    catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }  

const deleteFiles=async(req,res)=>{
    
    try{
        const {secure_url}=req.body;
        // console.log());
        const response=await deleteOnCloudinary(secure_url);
        if(response){
            const deletedFile=await File.deleteOne({fileURL:secure_url});
            if(deletedFile){
                res.status(200).json("File Successfully Deleted");
            }else{
                res.status(500).json("Internal Server Error");
            }
        }else{
            res.status(500).json("File not deleted on cloudinary");
        }
    }catch(err){
        res.status(500).json(err);
    }
};



        const downloadedFile = async (req, res) => {
            try {
                const basePath = path.resolve("./downloads"); // Define a base path for downloads
                if (!fs.existsSync(basePath)) {
                    fs.mkdirSync(basePath, { recursive: true });
                }
        
                const { secure_url } = req.body;
                if (!secure_url) {
                    return res.status(400).json("Missing URL");
                }
        
                // Generate a filename
                const filename = path.basename(new URL(secure_url).pathname);
                const outputPath = path.join(basePath, filename);
        
                const downloadFile = async (url, outputPath) => {
                    try {
                        const response = await axios({
                            method: 'GET',
                            url,
                            responseType: 'stream'
                        });
        
                        const writer = fs.createWriteStream(outputPath);
        
                        response.data.pipe(writer);
        
                        return new Promise((resolve, reject) => {
                            writer.on('finish', resolve);
                            writer.on('error', () => {
                                fs.unlink(outputPath, () => reject(new Error("Failed to write the file")));
                            });
                        });
                    } catch (error) {
                        throw new Error('Error downloading file: ' + error.message);
                    }
                };
        
                await downloadFile(secure_url, outputPath);
                res.json({ message: "File downloaded successfully", path: outputPath });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        };
        

export {uploadFiles,deleteFiles,downloadedFile,getFiles};