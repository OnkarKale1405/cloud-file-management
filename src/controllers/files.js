import File from "../models/files";
import { User } from "../models/user";
import Directory from "../models/directories";
import File from "../models/files";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware";
import { uploadOnCloudinary,deleteOnCloudinary } from "../utils/cloudinary";

const uploadFiles=async(req,res)=>{
    const user=User.findById(userId);
    if(user.role===2001){
        try{
            const {userId,file,DirectoryId} =req.body;
            const response=await uploadOnCloudinary(file.path);
            const regex = /\/v\d+\/([^/]+)\.(jpg|png|gif|...)/;
            const match = response.secureUrl.match(regex);
            const publicId = match ? match[1] : null;
            console.log(publicId);
            const newFile=[{
                fileName:file.name,
                fileURL:response.secure_url,
                publicID:publicId,
                userId:userId,
            }];
            File.insertMany(newFile).then((res)=>{console.log(res);});
            res.status(200).json("File Successfully Uploaded")
        }
        catch(err){
            console.log(err);
            req.status(500).json(err);
        }
    }
    
}

export {uploadFiles};