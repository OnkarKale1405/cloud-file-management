import mongoose, { Schema } from "mongoose";

const FileSchema=new Schema({
    fileName:{
        type:String,
    },
    fileURL:{
        type:String,
        required:true
    },
    publicID:{
        type:String
    },//Useful to get direct access to file on cloudinary
    userID:{
            type:Schema.Types.ObjectId,
            ref:"User"
    },
    // directoryID:{
    //     type:Schema.Types.ObjectId,
    //     ref:"Directory"
    // }, 
    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
    size:{
        type:Number,
    }
}
)

export const File=mongoose.model("File",FileSchema);
 