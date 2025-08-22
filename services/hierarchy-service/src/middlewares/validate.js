import { validationErrorResponse } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // return all errors
    if (error) {
        return validationErrorResponse(res, error);
    }
    next();
};
