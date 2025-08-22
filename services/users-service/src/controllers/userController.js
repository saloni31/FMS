import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messageConstants.js";
import { handleControllerError } from "../utils/errorHandler.js";
import userService from "../services/userService.js";
import { STATUS_CODES } from "@fms/common-auth";

class UserController {
    register = async (req, res) => {
        try {
            const result = await userService.register(req.body);
            return successResponse(res, result, MESSAGES.USER.SUCCESS.REGISTER_SUCCESS, STATUS_CODES.CREATED);
        } catch (error) {
            return handleControllerError(res, error);
        }
    }

    login = async (req, res) => {
        try {
            const result = await userService.login(req.body);
            return successResponse(res, result, MESSAGES.USER.LOGIN_SUCCESS, STATUS_CODES.OK);
        } catch (error) {
            return handleControllerError(res, error);
        }
    };
}

export default new UserController()