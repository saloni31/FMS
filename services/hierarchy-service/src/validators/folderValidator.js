import Joi from "joi";
import { MESSAGES } from "../constants/messageConstants.js";

// Validation for creating a folder
export const createFolderSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.FOLDER.NAME_STRING,
            "string.empty": MESSAGES.VALIDATION.FOLDER.NAME_REQUIRED,
            "any.required": MESSAGES.VALIDATION.FOLDER.NAME_REQUIRED,
        }),
    parentFolder: Joi.string()
        .optional()
        .allow(null)
        .messages({
            "string.base": MESSAGES.VALIDATION.FOLDER.PARENT_FOLDER_STRING,
        }),
});

// Validation for updating a folder
export const updateFolderSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.FOLDER.NAME_STRING,
            "string.empty": MESSAGES.VALIDATION.FOLDER.NAME_REQUIRED,
            "any.required": MESSAGES.VALIDATION.FOLDER.NAME_REQUIRED,
        }),
});