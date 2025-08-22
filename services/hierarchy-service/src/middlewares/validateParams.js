import AppError from "../utils/appError.js";
import { MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "@fms/common-auth";
import mongoose from "mongoose";

/**
 * Middleware to validate a specific URL parameter as a valid MongoDB ObjectId.
 * @param {*} paramName 
 * @returns 
 */
export const validateParam = (paramName) => {
    return (req, res, next) => {
        // explicitly check param existence
        if (!req.params || !req.params[paramName]) {
            return next(
                new AppError(
                    `${paramName} ${MESSAGES.VALIDATION.REQUIRED}`,
                    STATUS_CODES.UNPROCESSABLE_ENTITY
                )
            );
        }

        const paramValue = req.params[paramName];

        if (!mongoose.Types.ObjectId.isValid(paramValue)) {
            return next(
                new AppError(
                    `${paramName} ${MESSAGES.VALIDATION.INVALID_ID}`,
                    STATUS_CODES.UNPROCESSABLE_ENTITY
                )
            );
        }

        next();
    };
};
