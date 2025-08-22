import bcrypt from "bcrypt";
import User from "../models/users.js";
import AppError from "../utils/appError.js";
import { MESSAGES } from "../constants/messageConstants.js";
import { generateToken, STATUS_CODES } from "@fms/common-auth";

class UserService {
    /**
     * Function to register a new user
     * @param {*} userData 
     * @returns Registered user data without password
     */
    register = async (userData) => {
        const { username, email, password } = userData;

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            throw new AppError(MESSAGES.USER.ERROR.ALREADY_EXISTS, STATUS_CODES.CONFLICT);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Return response without password
        return {
            id: user._id,
            username: user.username,
            email: user.email,
        };
    };

    /**
     * Function to login a user
     * @param {*} param0 
     * @returns JWT token and user data
     */
    login = async ({ email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError(MESSAGES.USER.ERROR.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED);
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new AppError(MESSAGES.USER.ERROR.INVALID_CREDENTIALS, STATUS_CODES.UNAUTHORIZED);
        }

        const token = generateToken({
            userId: String(user._id),
            username: user.username,
            email: user.email,
        });

        return {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        };
    };
}

export default new UserService();
