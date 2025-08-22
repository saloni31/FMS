import express from "express";
import folderController from "../controllers/folderController.js";
import { validate } from "../middlewares/validate.js";
import { createFolderSchema, updateFolderSchema } from "../validators/folderValidator.js";
import { validateParam } from "../middlewares/validateParams.js";
import { authenticate } from "@fms/common-auth";

const route = express.Router();

/**
 * @swagger
 * /folders:
 *   post:
 *     summary: Create a new folder
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Folder 1"
 *               parentFolder:
 *                 type: string
 *                 example: "optionalParentFolderId"
 *     responses:
 *       201:
 *         description: Folder created successfully
 *       400:
 *         description: Validation error
 */
route.post("/folders", authenticate, validate(createFolderSchema), folderController.createFolder);

/**
 * @swagger
 * /folders/{id}:
 *   put:
 *     summary: Update folder details
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Folder Name"
 *               parentFolder:
 *                 type: string
 *                 example: "optionalParentFolderId"
 *     responses:
 *       200:
 *         description: Folder updated successfully
 *       404:
 *         description: Folder not found
 */
route.put("/folders/:id", authenticate, validate(updateFolderSchema), folderController.updateFolder);

/**
 * @swagger
 * /folders/{id}:
 *   delete:
 *     summary: Delete a folder
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID
 *     responses:
 *       200:
 *         description: Folder deleted successfully
 *       404:
 *         description: Folder not found
 */
route.delete("/folders/:id", authenticate, folderController.deleteFolder);

/**
 * @swagger
 * /viewstore:
 *   get:
 *     summary: Get all root-level folders (no parent)
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of root-level folders
 */
route.get("/viewstore", authenticate, folderController.getRootFolders);

/**
 * @swagger
 * /viewstore/{folderId}:
 *   get:
 *     summary: Get contents of a folder including subfolders and documents
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: folderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID
 *     responses:
 *       200:
 *         description: Folder contents retrieved successfully
 *       404:
 *         description: Folder not found
 */
route.get("/viewstore/:folderId", authenticate, folderController.getFolderContent);

/**
 * @swagger
 * /folders/{id}/parents:
 *   get:
 *     summary: Get folder hierarchy (all parent folders)
 *     tags:
 *       - Folders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Folder ID
 *     responses:
 *       200:
 *         description: Folder parents fetched successfully
 *       404:
 *         description: Folder not found
 */
route.get("/folders/:id/parents", authenticate, folderController.getFolderWithParents);

export default route;
