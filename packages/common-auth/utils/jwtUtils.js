import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');

    return jwt.sign(payload, privateKey, {
        algorithm: process.env.JWT_ALGO || "RS256",
        expiresIn: process.env.JWT_EXPIRATION || "1h",
    });
};

export const verifyToken = (token) => {
    const publicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
    return jwt.verify(token, publicKey, { algorithms: [process.env.JWT_ALGO || "RS256"] });
};
