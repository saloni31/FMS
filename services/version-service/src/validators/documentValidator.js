import Joi from "joi";
import { MESSAGES } from "../constants/messageConstants.js";

export const createDocumentSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.DOCUMENT.TITLE_STRING,
            "string.empty": MESSAGES.VALIDATION.DOCUMENT.TITLE_REQUIRED,
            "any.required": MESSAGES.VALIDATION.DOCUMENT.TITLE_REQUIRED,
        }),
    content: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.DOCUMENT.CONTENT_STRING,
            "string.empty": MESSAGES.VALIDATION.DOCUMENT.CONTENT_STRING,
            "any.required": MESSAGES.VALIDATION.DOCUMENT.CONTENT_STRING,
        }),
    folder: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.DOCUMENT.FOLDER_STRING,
            "string.empty": MESSAGES.VALIDATION.DOCUMENT.FOLDER_REQUIRED,
            "any.required": MESSAGES.VALIDATION.DOCUMENT.FOLDER_REQUIRED,
        }),
});

export const addVersionSchema = Joi.object({
    versionNumber: Joi.string().required().messages({
        "string.base": MESSAGES.VALIDATION.DOCUMENT.VERSION_STRING,
        "string.empty": MESSAGES.VALIDATION.DOCUMENT.VERSION_REQUIRED,
        "any.required": MESSAGES.VALIDATION.DOCUMENT.VERSION_REQUIRED
    }),
    folder: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.DOCUMENT.FOLDER_STRING,
            "string.empty": MESSAGES.VALIDATION.DOCUMENT.FOLDER_REQUIRED,
            "any.required": MESSAGES.VALIDATION.DOCUMENT.FOLDER_REQUIRED,
        }),
});

export const updateDocumentSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.DOCUMENT.TITLE_STRING,
            "string.empty": MESSAGES.VALIDATION.DOCUMENT.TITLE_REQUIRED,
            "any.required": MESSAGES.VALIDATION.DOCUMENT.TITLE_REQUIRED,
        }),
    content: Joi.string()
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.DOCUMENT.CONTENT_STRING,
            "string.empty": MESSAGES.VALIDATION.DOCUMENT.CONTENT_REQUIRED,
            "any.required": MESSAGES.VALIDATION.DOCUMENT.CONTENT_REQUIRED,
        }),
});