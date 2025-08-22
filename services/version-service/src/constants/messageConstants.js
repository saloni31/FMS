export const MESSAGES = {
    DOCUMENT: {
        SUCCESS: {
            DOCUMENT_CREATED: "Document created successfully",
            DOCUMENT_UPDATED: "Document updated successfully",
            DOCUMENT_DELETED: "Document deleted successfully",
            DOCUMENT_VERSION_CREATED: "Document version created successfully",
            DOCUMENT_FETCHED: "Documents fetched successfully",
            DOCUMENT_COUNT_FETCHED: "Documents count fetched successfully",
            DOCUMENT_VERSIONS_FETCHED: "Document versions fetched successfully",
        },
        ERROR: {
            DOCUMENT_NOT_FOUND: "Document not found",
            DOCUMENT_ALREADY_EXISTS: "Document with this title already exists in the folder",
            DOCUMENT_VERSION_NOT_FOUND: "Document version not found",
            DOCUMENT_UPLOAD_FAILED: "Failed to upload document",
        }
    },
    VALIDATION: {
        DOCUMENT: {
            TITLE_REQUIRED: "Document title is required",
            TITLE_STRING: "Document title must be a string",
            CONTENT_STRING: "Document content must be a string",
            CONTENT_REQUIRED: "Document content is required",
            FOLDER_REQUIRED: "Folder ID is required", // <-- add this
            FOLDER_STRING: "Folder ID must be a string",
            FILE_REQUIRED: "A file must be uploaded for this operation",
            VERSION_REQUIRED: "Version number is required",
            VERSION_STRING: "Version number must be a string",
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
