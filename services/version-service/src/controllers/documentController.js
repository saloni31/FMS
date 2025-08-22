import documentService from "../services/documentService.js";
import { successResponse } from "../utils/response.js";
import { handleControllerError } from "../utils/errorHandler.js";
import { STATUS_CODES } from "@fms/common-auth";
import { MESSAGES } from "../constants/messageConstants.js";
import AppError from "../utils/appError.js";

class DocumentController {
    /**
     * Function to create a new document
     * @param {*} req
     * @param {*} res
     * @returns Created document details
     */
    createDocument = async (req, res) => {
        try {
            const createdBy = req.user.userId;
            if (!req.file) {
                throw new AppError(MESSAGES.VALIDATION.DOCUMENT.FILE_REQUIRED, STATUS_CODES.BAD_REQUEST);
            }
            const doc = await documentService.createDocument(createdBy, req.body, req.file, req.folderPath);
            return successResponse(res, doc, MESSAGES.DOCUMENT.SUCCESS.CREATED);
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    createDocumentVersion = async (req, res) => {
        try {
            const documentId = req.params.id;
            const { versionNumber } = req.body;

            if (!req.file) {
                throw new AppError(MESSAGES.VALIDATION.DOCUMENT.FILE_REQUIRED, STATUS_CODES.BAD_REQUEST);
            }

            const userId = req.user.userId;

            const version = await documentService.createDocumentVersion(
                documentId,
                userId,
                versionNumber,
                req.file,
                req.folderPath
            );

            return successResponse(res, version, MESSAGES.DOCUMENT.SUCCESS.DOCUMENT_VERSION_CREATED);
        } catch (err) {
            return handleControllerError(res, err);
        }
    };

    /**
     * Function to get document details by ID
     * @param {*} req
     * @param {*} res
     * @returns Document details
     */
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

    /**
     * Function to get all versions of a document
     * @param {*} req
     * @param {*} res
     * @returns Document versions
     */
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

    /**
     * Function to delete a document by ID
     * @param {*} req
     * @param {*} res
     * @returns Void
     */
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

    /**
     * Function to filter documents based on search criteria
     * @param {*} req
     * @param {*} res
     * @returns Filtered documents
     */
    filterDocuments = async (req, res) => {
        try {
            const { search } = req.query;
            const token = req.headers.authorization?.split(" ")[1];
            const documents = await documentService.filterDocuments(search, req.user.userId, token);

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

    /**
     * Function to count total documents for a user
     * @param {*} req
     * @param {*} res
     * @returns Total document count
     */
    countDocuments = async (req, res) => {
        try {
            const userId = req.user.userId;

            const total = await documentService.countDocuments(userId);
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

    /**
     * Function to update document details
     * @param {*} req
     * @param {*} res
     * @returns Updated document details
     */
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
