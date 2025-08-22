import { validationErrorResponse } from "../utils/response.js";

/**
 * Middleware to validate request body against a Joi schema.
 * @param {*} schema 
 * @returns array of validation errors or proceeds to next middleware
 */
export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // return all errors
    if (error) {
        return validationErrorResponse(res, error);
    }
    next();
};
