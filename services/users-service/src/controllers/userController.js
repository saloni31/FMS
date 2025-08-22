import { successResponse } from "../utils/response.js";
import { MESSAGES } from "../constants/messageConstants.js";
import { handleControllerError } from "../utils/errorHandler.js";
import userService from "../services/userService.js";
import { STATUS_CODES } from "@fms/common-auth";

class UserController {
    /**
     * Function to register a new user
     * @param {*} req 
     * @param {*} res 
     * @returns Registered user details
     */
    register = async (req, res) => {
        try {
            const result = await userService.register(req.body);
            return successResponse(res, result, MESSAGES.USER.SUCCESS.REGISTER_SUCCESS, STATUS_CODES.CREATED);
        } catch (error) {
            return handleControllerError(res, error);
        }
    }

    /**
     * Function to login a user
     * @param {*} req 
     * @param {*} res 
     * @returns Logged in user details with token
     */
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