import Document from "../models/document.js";
import fs from "fs";
import path from "path";
import AppError from "../utils/appError.js";
import { STATUS_CODES } from "@fms/common-auth";
import { MESSAGES } from "../constants/messageConstants.js";
import { fetchFolderParents } from "./hierarchyClient.js";

class DocumentController {
    createDocument = async (userId, data, file, folderPath) => {
        const { title, content, folder } = data;

        // Check if document with same title exists in the folder
        const existingDoc = await Document.findOne({ folder, title });
        if (existingDoc) {
            throw new AppError(MESSAGES.DOCUMENT.ERROR.DOCUMENT_ALREADY_EXISTS, STATUS_CODES.CONFLICT);
        }

        let versions = [];

        if (file) {
            // Ensure folder exists
            fs.mkdirSync(folderPath, { recursive: true });

            // Generate unique file name
            const ext = path.extname(file.originalname);
            const finalFileName = `${Date.now()}${ext}`;
            const finalPath = path.join(folderPath, finalFileName);

            // Copy file from tmp -> final folder (safe across devices)
            await fs.copyFileSync(file.path, finalPath);
            // Optionally delete tmp file
            await fs.unlinkSync(file.path);

            const uploadsRoot = process.env.UPLOAD_ROOT || path.join(process.cwd(), "uploads");
            const relativePath = path.relative(process.cwd(), finalPath); // "uploads/Folder 1/xxxx.jpeg"
            const fileUrl = relativePath.replace(/\\/g, "/"); // normalize Windows paths

            versions.push({
                version: "1.0",
                fileUrl,
                uploadedAt: new Date(),
            });
        }

        const doc = await Document.create({
            title,
            content,
            folder,
            versions,
            createdBy: userId,
        });

        return doc;
    };

    getDocumentById = async (documentId) => {
        const doc = await Document.findById(documentId).lean();

        if (!doc) {
            throw new AppError(MESSAGES.DOCUMENT.ERROR.DOCUMENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        // Return only required fields
        return {
            id: doc._id,
            title: doc.title,
            content: doc.content,
            folder: doc.folder,
            createdAt: doc.createdAt,
            versions: doc.versions.map(v => ({
                version: v.version,
                fileUrl: v.fileUrl,
                uploadedAt: v.uploadedAt
            }))
        };
    };


    getDocumentVersions = async (documentId) => {
        const doc = await Document.findById(documentId).lean();

        if (!doc) {
            throw new AppError(MESSAGES.DOCUMENT.ERROR.DOCUMENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        return doc.versions.map(v => ({
            version: v.version,
            fileUrl: v.fileUrl,
            uploadedAt: v.uploadedAt
        }));
    };

    deleteDocument = async (documentId, userId) => {
        const doc = await Document.findOne({ _id: documentId, createdBy: userId });

        if (!doc) {
            throw new AppError(MESSAGES.DOCUMENT.ERROR.DOCUMENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        // Delete all version files from storage
        for (const version of doc.versions) {
            if (version.fileUrl) {
                const filePath = path.join(process.env.UPLOAD_ROOT || "uploads", version.fileUrl);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        // Delete document from DB
        await Document.deleteOne({ _id: documentId });
    };


    filterDocuments = async (search, userId, token) => {
        const query = { createdBy: userId };
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }

        const docs = await Document.find(query).lean();

        const result = [];

        for (const doc of docs) {
            try {
                const parents = await fetchFolderParents(doc.folder, token);
                const folderPath = parents.map(p => p.name).join("/");

                result.push({
                    id: doc._id,
                    title: doc.title,
                    folderPath
                });
            } catch (err) {
                throw new AppError("Failed to resolve folder hierarchy", STATUS_CODES.INTERNAL_SERVER_ERROR);
            }
        }

        return result;
    };

    countDocuments = async (userId) => {
        const totalDocuments = await Document.countDocuments({ createdBy: userId });
        return { totalDocuments };
    };

    updateDocument = async (documentId, userId, data) => {
        const document = await Document.findOne({ _id: documentId, createdBy: userId });
        if (!document) {
            throw new AppError(MESSAGES.DOCUMENT.ERROR.DOCUMENT_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        // Check if title is being updated and already exists in same folder
        if (data.title && data.title !== document.title) {
            const existing = await Document.findOne({
                title: data.title,
                folder: document.folder,
                createdBy: userId,
                _id: { $ne: documentId }
            });
            if (existing) {
                throw new AppError(MESSAGES.DOCUMENT.ERROR.DOCUMENT_ALREADY_EXISTS, STATUS_CODES.CONFLICT);
            }
        }

        document.title = data.title || document.title;
        document.content = data.content || document.content;
        await document.save();

        return document;
    };

}

export default new DocumentController();
