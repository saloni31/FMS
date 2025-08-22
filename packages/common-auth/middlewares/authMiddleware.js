import { verifyToken } from "../utils/jwtUtils.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// Middleware is used to authenticate API calls using jwt token
export const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            message: "Access token missing or invalid",
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded; // attach decoded payload to request
        next();
    } catch (err) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
