import mongoose from "mongoose";

// Version schema
const versionSchema = new mongoose.Schema(
    {
        version: { type: String, required: true, trim: true },
        fileUrl: { type: String, required: true, trim: true },
        uploadedAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

// Document schema
const documentSchema = new mongoose.Schema(
    {
        title: { type: String, required: [true, "Document title is required"], trim: true },
        content: { type: String, default: "" },
        folder: { type: mongoose.Schema.Types.ObjectId, required: [true, "Folder ID is required"], ref: "Folder" },
        versions: { type: [versionSchema], default: [] },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Creator ID is required"] },
    },
    { timestamps: true }
);

// Helper to add version
documentSchema.methods.addVersion = function (versionNumber, fileUrl) {
    this.versions.push({ version: versionNumber, fileUrl });
    return this.save();
};

export default mongoose.model("Document", documentSchema);
