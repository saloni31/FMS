import { MESSAGES } from "../constants/messageConstants.js";
import { STATUS_CODES } from "@fms/common-auth";

// Utility functions for sending standardized API responses
export const successResponse = (res, data = {}, message = MESSAGES.COMMON.SUCCESS, statusCode = STATUS_CODES.SUCCESS) => {
    return res.status(statusCode).json({
        status: statusCode,
        success: true,
        message,
        data,
    });
};

// Utility function for sending error responses
export const errorResponse = (res, error = MESSAGES.COMMON.SERVER_ERROR, statusCode = STATUS_CODES.SERVER_ERROR) => {
    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        message: error,
    });
};

// Utility function for sending validation error responses
export const validationErrorResponse = (res, error, statusCode = STATUS_CODES.UNPROCESSABLE_ENTITY) => {
    return res.status(statusCode).json({
        status: statusCode,
        success: false,
        errors: error.details.map((err) => err.message),
    });
};