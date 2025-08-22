import folderService from "../services/folderService.js";
import { successResponse } from "../utils/response.js";
import { handleControllerError } from "../utils/errorHandler.js";
import { MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "@fms/common-auth";

class FolderController {
    createFolder = async (req, res) => {
        try {
            const folder = await folderService.createFolder(req.user.userId, req.body);
            return successResponse(res, folder, MESSAGES.FOLDER.SUCCESS.FOLDER_CREATED, STATUS_CODES.CREATED);
        } catch (err) {
            return handleControllerError(res, err);
        }
    }

    updateFolder = async (req, res) => {
        try {
            const folder = await folderService.updateFolder(req.params.id, req.body, req.user.userId);
            return successResponse(res, folder, MESSAGES.FOLDER.SUCCESS.FOLDER_UPDATED, STATUS_CODES.SUCCESS);
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    deleteFolder = async (req, res) => {
        try {
            const result = await folderService.deleteFolder(req.params.id, req.user.userId);
            return successResponse(res, result, MESSAGES.FOLDER.SUCCESS.FOLDER_DELETED, STATUS_CODES.DELETED);
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    getRootFolders = async (req, res) => {
        try {
            const folders = await folderService.getRootFolders(req.user.userId);
            return successResponse(res, folders, MESSAGES.FOLDER.SUCCESS.ROOT_FOLDERS_FOUND, STATUS_CODES.SUCCESS);
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    getFolderContent = async (req, res) => {
        try {
            const content = await folderService.getFolderContent(req.user.userId, req.params.folderId);
            return successResponse(res, content, MESSAGES.FOLDER.SUCCESS.FOLDER_CONTENT_FETCHED, STATUS_CODES.SUCCESS);
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    getFolderWithParents = async (req, res) => {
        try {
            const folderHierarchy = await folderService.getFolderWithParents(req.params.id);

            return successResponse(
                res,
                folderHierarchy,
                MESSAGES.FOLDER.SUCCESS.FOLDER_PARENTS_FETCHED,
                STATUS_CODES.SUCCESS
            );
        } catch (err) {
            return handleControllerError(res, err);
        }
    };
}

export default new FolderController();