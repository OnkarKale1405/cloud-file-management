import { Router } from "express";
import multer from "multer";
import { upload } from "../middlewares/multer.middleware";
import { uploadFiles } from "../controllers/files";
// import router from "./user.routes";

const router = Router();

router.route("/user/uploadFile").post(upload,uploadFiles);

export default router; 