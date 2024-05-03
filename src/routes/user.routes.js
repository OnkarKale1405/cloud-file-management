import { Router } from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
} from "../controllers/user.controllers.js";

// middlewares
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/user").get( getCurrentUser);
router.route("/update-details").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar")
    .patch(
        verifyJWT,
        upload.single("avatar"),
        updateUserAvatar
    );

export default router