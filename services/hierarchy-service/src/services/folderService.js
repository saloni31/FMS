import Folder from "../models/folders.js";
import { STATUS_CODES } from "@fms/common-auth";
import { MESSAGES } from "../constants/messageConstants.js";
import AppError from "../utils/appError.js";
class FolderService {
    createFolder = async (userId, data) => {
        // If parent folder id is provided and its not available then throw an error
        if (data.parentFolder) {
            const parentExists = await Folder.findOne({
                _id: data.parentFolder,
                createdBy: userId,
            });

            if (!parentExists) {
                throw new AppError(MESSAGES.FOLDER.ERROR.PARENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
            }
        }

        // Check if folder with same name exists at the same level
        const existingFolder = await Folder.findOne({
            createdBy: userId,
            parentFolder: data.parentFolder || null,
            name: data.name,
        });

        if (existingFolder) {
            throw new AppError(MESSAGES.FOLDER.ERROR.FOLDER_ALREADY_EXISTS, STATUS_CODES.CONFLICT);
        }

        const folder = await Folder.create({ ...data, createdBy: userId });
        return folder;
    };

    updateFolder = async (id, data, userId) => {
        // Check if another folder with same name exists at same level
        const existingFolder = await Folder.findOne({
            _id: { $ne: id }, // exclude current folder
            createdBy: userId,
            parentFolder: data.parentFolder || null,
            name: data.name,
        });

        if (existingFolder) {
            throw new AppError(MESSAGES.FOLDER.ERROR.FOLDER_ALREADY_EXISTS, STATUS_CODES.CONFLICT);
        }

        const folder = await Folder.findOneAndUpdate(
            { _id: id, createdBy: userId },
            data,
            { new: true }
        );

        return folder;
    };

    deleteFolder = async (folderId, userId) => {
        await this._deleteFolderRecursively(folderId, userId);
        return {
            message: MESSAGES.FOLDER.SUCCESS.FOLDER_DELETED,
        };
    };

    getRootFolders = async (userId) => {
        return await Folder.find({ createdBy: userId, parentFolder: null });
    };

    getFolderContent = async (userId, folderId) => {
        // Validate folder existence
        const folder = await Folder.findOne({ _id: folderId, createdBy: userId });
        if (!folder) {
            throw new AppError(MESSAGES.FOLDER.ERROR.FOLDER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        const subfolders = await Folder.find({ createdBy: userId, parentFolder: folderId });
        // later add documents here when documents microservice is ready
        return { subfolders, documents: [] };
    };

    /**
     * Recursively delete folder and its subfolders + documents
    */
    _deleteFolderRecursively = async (folderId, userId) => {
        const folder = await Folder.findOne({ _id: folderId, createdBy: userId });

        if (!folder) {
            throw new AppError(MESSAGES.FOLDER.ERROR.FOLDER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        // Delete all documents in this folder
        // await Document.deleteMany({ folder: folderId, createdBy: userId });

        // Find all subfolders of this folder
        const subfolders = await Folder.find({ parentFolder: folderId, createdBy: userId });

        // Recursively delete each subfolder
        for (const sub of subfolders) {
            await this._deleteFolderRecursively(sub._id, userId);
        }

        // Delete this folder
        await Folder.deleteOne({ _id: folderId, createdBy: userId });

        return true;
    };

    getFolderWithParents = async (folderId) => {
        let folder = await Folder.findById(folderId);

        if (!folder) {
            throw new AppError(MESSAGES.FOLDER.ERROR.FOLDER_NOT_FOUND,STATUS_CODES.NOT_FOUND);
        }

        const hierarchy = [];
        while (folder) {
            hierarchy.unshift({
                id: folder._id,
                name: folder.name,
            });

            if (!folder.parentFolder) break;
            folder = await Folder.findById(folder.parentFolder);
        }

        return hierarchy;
    };
}

export default new FolderService();