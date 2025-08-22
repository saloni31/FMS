import Joi from "joi";
import { MESSAGES } from "../constants/messageConstants.js";

export const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": MESSAGES.VALIDATION.USERNAME_REQUIRED,
            "string.empty": MESSAGES.VALIDATION.USERNAME_REQUIRED,
            "string.min": MESSAGES.VALIDATION.USERNAME_MIN,
            "string.max": MESSAGES.VALIDATION.USERNAME_MAX,
            "any.required": MESSAGES.VALIDATION.USERNAME_REQUIRED,
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": MESSAGES.VALIDATION.EMAIL_INVALID,
            "string.empty": MESSAGES.VALIDATION.EMAIL_REQUIRED,
            "any.required": MESSAGES.VALIDATION.EMAIL_REQUIRED,
        }),

    password: Joi.string()
        .min(6)
        .max(12)
        .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$"))
        .required()
        .messages({
            "string.empty": MESSAGES.VALIDATION.PASSWORD_REQUIRED,
            "string.min": MESSAGES.VALIDATION.PASSWORD_MIN,
            "string.max": MESSAGES.VALIDATION.PASSWORD_MAX,
            "string.pattern.base": MESSAGES.VALIDATION.PASSWORD_PATTERN,
            "any.required": MESSAGES.VALIDATION.PASSWORD_REQUIRED,
        }),
});
