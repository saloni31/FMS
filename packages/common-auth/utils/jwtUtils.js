import jwt from "jsonwebtoken";

/**
 * Generates a JWT token
 * @param {*} payload 
 * @returns The generated JWT token 
 */
export const generateToken = (payload) => {
    const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');

    return jwt.sign(payload, privateKey, {
        algorithm: process.env.JWT_ALGO || "RS256",
        expiresIn: process.env.JWT_EXPIRATION || "1h",
    });
};

/**
 * Verifies a JWT token
 * @param {*} token 
 * @returns the decoded token if valid, otherwise throws an error
 */
export const verifyToken = (token) => {
    const publicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
    return jwt.verify(token, publicKey, { algorithms: [process.env.JWT_ALGO || "RS256"] });
};
