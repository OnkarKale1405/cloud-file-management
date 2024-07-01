import multer from "multer";
import express from "express";
import { upload } from "../middlewares/multer.js";
import { uploadFiles,deleteFiles,downloadedFile ,getFiles} from "../controllers/files.js";
// import router from "./user.routes";


const router = express.Router();

router.route("/uploadFile").post(
    upload.fields([
        {
            name: "NewFile",
            maxCount: 1
        }])    
        ,uploadFiles);
router.route("/getFile").post(getFiles);
router.route("/deleteFile").post(deleteFiles);
router.route("/downloadFile").post(downloadedFile);

export default router; 