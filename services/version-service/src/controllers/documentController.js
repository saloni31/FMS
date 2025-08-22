import documentService from "../services/documentService.js";
import { successResponse } from "../utils/response.js";
import { handleControllerError } from "../utils/errorHandler.js";
import { STATUS_CODES } from "@fms/common-auth";
import { MESSAGES } from "../constants/messageConstants.js";
import AppError from "../utils/appError.js";

class DocumentController {
    createDocument = async (req, res) => {
        try {
            const createdBy = req.user.userId;
            if (!req.file) {
                throw new AppError(MESSAGES.VALIDATION.DOCUMENT.FILE_REQUIRED, STATUS_CODES.BAD_REQUEST);
            }
            const doc = await documentService.createDocument( createdBy, req.body, req.file,req.folderPath );
            return successResponse(res, doc, MESSAGES.DOCUMENT.SUCCESS.CREATED);
        } catch (err) {
            return handleControllerError(res, err);
        }
    };
    getDocumentDetails = async (req, res) => {
        try {
            const documentId = req.params.id;
            const document = await documentService.getDocumentById(documentId);

            return successResponse(
                res,
                document,
                MESSAGES.DOCUMENT.SUCCESS.DOCUMENT_FETCHED,
                STATUS_CODES.SUCCESS
            );
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    getDocumentVersions = async (req, res) => {
        try {
            const documentId = req.params.id;
            const versions = await documentService.getDocumentVersions(documentId);

            return successResponse(
                res,
                versions,
                MESSAGES.DOCUMENT.SUCCESS.DOCUMENT_VERSIONS_FETCHED,
                STATUS_CODES.SUCCESS
            );
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    deleteDocument = async (req, res) => {
        try {
            const documentId = req.params.id;
            await documentService.deleteDocument(documentId, req.user.userId);

            return successResponse(
                res,
                null,
                MESSAGES.DOCUMENT.SUCCESS.DOCUMENT_DELETED,
                STATUS_CODES.SUCCESS
            );
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    filterDocuments = async (req, res) => {
        try {
            const { search } = req.query;
            const token = req.headers.authorization?.split(" ")[1];
            const documents = await documentService.filterDocuments(search, req.user.userId,token);

            return successResponse(
                res,
                documents,
                MESSAGES.DOCUMENT.SUCCESS.DOCUMENT_FETCHED,
                STATUS_CODES.SUCCESS
            );
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    countDocuments = async (req, res) => {
        try {
            const total = await documentService.countDocuments(req.user.userId);
            return successResponse(
                res,
                total,
                MESSAGES.DOCUMENT.SUCCESS.DOCUMENT_COUNT_FETCHED,
                STATUS_CODES.SUCCESS
            );
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    updateDocument = async (req, res) => {
        try {
            const updatedDoc = await documentService.updateDocument(
                req.params.id,
                req.user.userId,
                req.body
            );
            return successResponse(
                res,
                updatedDoc,
                MESSAGES.DOCUMENT.SUCCESS.DOCUMENT_UPDATED,
                STATUS_CODES.SUCCESS
            );
        } catch (err) {
            return handleControllerError(res, err);
        }
    };





}

export default new DocumentController();
