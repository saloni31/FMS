import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HIERARCHY_SERVICE_URL = process.env.HIERARCHY_SERVICE_URL || "http://fms_hierarchy_service:3000";

export const fetchFolderParents = async (folderId, token) => {
    try {
        const res = await axios.get(
            `${HIERARCHY_SERVICE_URL}/api/v1/folders/${folderId}/parents`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data.data;
    } catch (err) {
        throw new Error(`Failed to resolve folder hierarchy: ${err.message}`);
    }
};