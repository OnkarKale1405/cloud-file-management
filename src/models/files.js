import mongoose from "mongoose";

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
    } 
}
)

const File=mongoose.model("File",FileSchema);
export default File