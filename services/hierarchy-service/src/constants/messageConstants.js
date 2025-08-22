export const MESSAGES = {
    FOLDER: {
        SUCCESS: {
            FOLDER_CREATED: "Folder created successfully",
            FOLDER_UPDATED: "Folder updated successfully",
            FOLDER_DELETED: "Folder deleted successfully",
            ROOT_FOLDERS_FOUND: "Root folders fetched successfully",
            FOLDER_CONTENT_FETCHED: "Folder content fetched successfully",
            FOLDER_PARENTS_FETCHED: "Folder parents fetched successfully",
        },
        ERROR: {
            FOLDER_NOT_FOUND: "Folder not found",
            FOLDER_ALREADY_EXISTS: "Folder name already exists at this level",
            PARENT_NOT_FOUND: "Parent folder not found"
        }
    },
    VALIDATION: {
        FOLDER: {
            NAME_REQUIRED: "Folder name is required",
            PARENT_FOLDER_STRING: "Parent folder must be a string",
            NAME_STRING: "Folder name must be a string",
            REQUIRED: "is required",
            INVALID_ID: "must be a valid Mongo ObjectId"

        }
    },
    COMMON: {
        SERVER_ERROR: "Something went wrong",
        UNAUTHORIZED: "Unauthorized access",
        FORBIDDEN: "Forbidden access",
        NOT_FOUND: "Resource not found",
        SUCCESS: "Success"
    },
}