export const MESSAGES = {
    USER: {
        SUCCESS: {
            REGISTER_SUCCESS: "User registered successfully",
            LOGIN_SUCCESS: "User logged in successfully",
        },
        ERROR: {
            ALREADY_EXISTS: "Username or Email already exists",
            NOT_FOUND: "User not found",
            INVALID_CREDENTIALS: "Invalid email or password",
        }
    },
    VALIDATION: {
        USERNAME_REQUIRED: "Username is required",
        USERNAME_MIN: "Username must be at least 3 characters long",
        USERNAME_MAX: "Username must be less than or equal to 30 characters",
        EMAIL_REQUIRED: "Email is required",
        EMAIL_INVALID: "Email must be a valid email address",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_MIN: "Password must be at least 6 characters long",
        PASSWORD_MAX: "Password must not exceed 12 characters",
        PASSWORD_PATTERN: "Password must contain at least one uppercase letter, one number, and one special character",
    },
    COMMON: {
        SERVER_ERROR: "Something went wrong",
        UNAUTHORIZED: "Unauthorized access",
        FORBIDDEN: "Forbidden access",
        NOT_FOUND: "Resource not found",
        SUCCESS: "Success"
    },
};
