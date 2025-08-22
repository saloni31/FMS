import path from "path";
import { fetchFolderParents } from "../services/hierarchyClient.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const resolveFolderPath = async (req, res, next) => {
    try {
        const folderId = req.body.folder || req.body.folderId;
        if (!folderId) return next();

        const token = req.headers.authorization?.split(" ")[1];
        const parents = await fetchFolderParents(folderId, token); // call hierarchy-service

        const parts = parents.map(p => p.name);
        const root = process.env.UPLOAD_ROOT || "/app/uploads/";
        const folderPath = path.join(root, ...parts);
        console.log("folderPath", folderPath);
        fs.mkdirSync(folderPath, { recursive: true });
        req.folderPath = folderPath;
        next();
    } catch (err) {
        next(err);
    }
};
