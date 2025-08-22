import { errorResponse } from "./response.js";
import AppError from "./appError.js";
import { STATUS_CODES } from "@fms/common-auth";

export const handleControllerError = (res, error) => {
    if (error instanceof AppError) {
        return errorResponse(res, error.message, error.statusCode);
    }

    return errorResponse(
        res,
        error.message || "Internal Server Error",
        STATUS_CODES.INTERNAL_SERVER_ERROR
    );
};
