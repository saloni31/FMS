import axios from "axios";
import dotenv from "dotenv";
import AppError from "../utils/appError.js";
import {MESSAGES} from "../constants/messageConstants.js";
import {STATUS_CODES} from "@fms/common-auth";
import Folder from "../models/folders.js";
import fs from "fs";
import path from "path";
import folderService from "./folderService.js";
dotenv.config();

const VERSION_SERVICE_URL = process.env.VERSION_SERVICE_URL || "http://fms_version_service:3000";

export const getAllDocumentsByFolder = async (folderId, token) => {
    try {
        const res = await axios.get(
            `${VERSION_SERVICE_URL}/api/v1/documents/folder/${folderId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data.data;
    } catch (err) {
        throw new Error(`Failed to resolve folder hierarchy: ${err.message}`);
    }
};

export const deleteDocumentsByFolder = async (folderId, token) => {
    try {
        const res = await axios.delete(
            `${VERSION_SERVICE_URL}/api/v1/documents/folder/${folderId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data.data;
    } catch (err) {
        throw new Error(`Failed to resolve folder hierarchy: ${err.message}`);
    }
};

export const deleteFolderRecursively = async (folderId, userId, token) => {
    const folder = await Folder.findOne({ _id: folderId, createdBy: userId });
    if (!folder) {
        throw new AppError(MESSAGES.FOLDER.ERROR.FOLDER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }

    try {
        await axios.delete(`${VERSION_SERVICE_URL}/api/v1/documents/folder/${folderId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (err) {
        throw new AppError(`Failed to delete documents for folder ${folderId}: ${err.message}`, STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

    const subfolders = await Folder.find({ parentFolder: folderId, createdBy: userId });

    for (const sub of subfolders) {
        await deleteFolderRecursively(sub._id, userId, token);
    }


    const parents = await folderService.getFolderWithParents(folderId);
    const parts = parents.map(p => p.name);
    const root = process.env.UPLOAD_ROOT || "/app/uploads/";
    const folderPath = path.join(root, ...parts).replace(" ","_");
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
    }
    await Folder.deleteOne({ _id: folderId, createdBy: userId });


    return true;
};