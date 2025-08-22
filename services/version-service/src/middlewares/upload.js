import multer from "multer";
import fs from "fs";
import path from "path";

export const uploadFile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const tempPath = "tmp";
            fs.mkdirSync(tempPath, { recursive: true });
            cb(null, tempPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}${ext}`);
        },
    }),
});
