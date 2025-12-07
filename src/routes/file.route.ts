import { fileController } from "@/controller/file.controller";
import { upload } from "@/lib/multer";
import { filesRoute } from "@/types/routes/file.route";
import { Router } from "express";

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File upload endpoints
 */
const router = Router();

/**
 * @swagger
 * /files/upload-single:
 *   post:
 *     tags: [Files]
 *     summary: Upload a single file (image, video, etc.) to Cloudflare R2
 *     description: >
 *       Uploads a file to Cloudflare R2.
 *       If a **folder** field is provided in the form-data, the file will be stored under:
 *       `byway-lms/{folder}/{filename}`
 *       Otherwise, the default path is:
 *       `byway-lms/uploads/{filename}`
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload (image, video, or any file)
 *               folder:
 *                 type: string
 *                 description: Optional folder name inside byway-lms
 *
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Missing file or invalid request
 *       500:
 *         description: Internal server error - upload failed
 */
router.post(filesRoute.uploadFile, upload.single("file"), fileController.uploadSingle);

/**
 * @swagger
 * /files/upload-multiple:
 *   post:
 *     tags: [Files]
 *     summary: Upload multiple files (images, videos, etc.) to Cloudflare R2
 *     description: >
 *       Uploads multiple files to Cloudflare R2.
 *       If a **folder** field is provided in the form-data, files will be stored under:
 *       `byway-lms/{folder}/{filename}`
 *       Otherwise, the default path is:
 *       `byway-lms/uploads/{filename}`
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *             properties:
 *               files:
 *                 type: array
 *                 description: Array of files to upload (images, videos, any file)
 *                 items:
 *                   type: string
 *                   format: binary
 *               folder:
 *                 type: string
 *                 description: Optional folder name inside byway-lms
 *
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Missing files or invalid request
 *       500:
 *         description: Internal server error - upload failed
 */
router.post(filesRoute.uploadFiles, upload.array("files"), fileController.uploadMultiple);

export const fileRoutes = router;
