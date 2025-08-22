import express from "express";
import { authenticate } from "@fms/common-auth";
import documentController from "../controllers/documentController.js";
import { validate } from "../middlewares/validate.js";
import { createDocumentSchema, addVersionSchema, updateDocumentSchema } from "../validators/documentValidator.js";
import { resolveFolderPath } from "../middlewares/folderPathResolver.js";
import { uploadFile } from "../middlewares/upload.js";

const route = express.Router();

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Create a new document
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Document Title"
 *               content:
 *                 type: string
 *                 example: "Document Content"
 *               folder:
 *                 type: string
 *                 example: "folderId"
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Document created successfully
 *       409:
 *         description: Document with this title already exists in the folder
 *       400:
 *         description: Validation error
 */
route.post(
    "/documents",
    authenticate,
    uploadFile.single("file"),
    resolveFolderPath,
    validate(createDocumentSchema),
    documentController.createDocument
);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Get document details
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document details returned successfully
 *       404:
 *         description: Document not found
 */
route.get(
    "/documents/:id",
    authenticate,
    documentController.getDocumentDetails
);

/**
 * @swagger
 * /documents/{id}/versions:
 *   get:
 *     summary: Retrieve all versions of a document
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: List of document versions
 *       404:
 *         description: Document not found
 */
route.get(
    "/documents/:id/versions",
    authenticate,
    documentController.getDocumentVersions
);

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document along with all versions
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 */
route.delete(
    "/documents/:id",
    authenticate,
    documentController.deleteDocument
);

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Filter documents by search term
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter documents by title or content
 *     responses:
 *       200:
 *         description: Filtered list of documents
 */
route.get(
    "/filter",
    authenticate,
    documentController.filterDocuments
);

/**
 * @swagger
 * /total-documents:
 *   get:
 *     summary: Get total count of documents for the authenticated user
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of documents
 */
route.get(
    "/total-documents",
    authenticate,
    documentController.countDocuments
);

/**
 * @swagger
 * /documents/{id}:
 *   put:
 *     summary: Update document details (title or content)
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Document Title"
 *               content:
 *                 type: string
 *                 example: "Updated Document Content"
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       404:
 *         description: Document not found
 */
route.put(
    "/documents/:id",
    authenticate,
    validate(updateDocumentSchema),
    documentController.updateDocument
);


/**
 * @swagger
 * /documents/{id}/version:
 *   post:
 *     summary: Create a new version of a document
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Document ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               versionNumber:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document version created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Document not found
 */
route.post(
    "/documents/:id/version",
    authenticate,
    uploadFile.single("file"),
    resolveFolderPath,
    validate(addVersionSchema),
    documentController.createDocumentVersion
);

route.get(
    "/documents/folder/:folderId",
    authenticate,
    documentController.getDocumentsByFolder
);


route.delete(
    "/documents/folder/:folderId",
    authenticate,
    documentController.deleteDocumentsByFolder
);
export default route;
