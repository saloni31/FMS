import Joi from "joi";
import { MESSAGES } from "../constants/messageConstants.js";

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": MESSAGES.VALIDATION.EMAIL_REQUIRED,
            "string.email": MESSAGES.VALIDATION.EMAIL_INVALID,
            "any.required": MESSAGES.VALIDATION.EMAIL_REQUIRED,
        }),
    password: Joi.string()
        .required()
        .messages({
            "string.empty": MESSAGES.VALIDATION.PASSWORD_REQUIRED,
            "any.required": MESSAGES.VALIDATION.PASSWORD_REQUIRED,
        }),
});
