import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Make sure this directory exists or multer will throw an error.
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Use file.originalname to get the name and extension of the file that was originally uploaded.
        const originalName = file.originalname;
        console.log(originalName);
        const fileExtension = originalName.slice(originalName.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
})

export const upload = multer({ storage: storage });
