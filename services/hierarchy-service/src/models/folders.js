import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        parentFolder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
            default: null,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // userId from users-service
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Folder", folderSchema);
