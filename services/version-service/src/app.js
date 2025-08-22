import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import path from "path";

import connectDB from "./config/db.js";
import route from "./routers/index.js";
import { setupSwagger } from "./utils/swagger.js";

const app = express();
app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ "origin": "*/*" }))
app.use("/api/v1/", route)

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        path: req.originalUrl,
    });
});

dotenv.config();
connectDB()
setupSwagger(app);
const UPLOAD_ROOT = process.env.UPLOAD_ROOT || "uploads";
app.listen(process.env.PORT, () => console.log(`User service running on port ${process.env.PORT}`));
