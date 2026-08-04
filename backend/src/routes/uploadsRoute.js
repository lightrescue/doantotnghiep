import { Router } from "express";
import multer from "multer";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    configureCloudinary,
    getUploadStatus,
    uploadImage,
    deleteImage
} from "../controllers/uploadsController.js";

const router = Router();

// Multer lưu vào RAM (buffer) → upload thẳng lên Cloudinary, không ghi đĩa
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (_req, file, cb) => {
        if (/^image\/(jpe?g|png|webp|gif|bmp|svg\+xml)$/.test(file.mimetype)) cb(null, true);
        else cb(new Error("Chỉ chấp nhận file ảnh (JPG, PNG, WEBP, GIF, BMP, SVG)."));
    },
});

// GET /api/uploads/status — debug + để frontend biết Cloudinary có active không
router.get("/status", getUploadStatus);

// POST /api/uploads/image — upload 1 file ảnh, trả về URL Cloudinary
router.post(
    "/image",
    adminOnly,
    (req, res, next) => {
        if (!configureCloudinary()) {
            return res.status(500).json({
                error: "Chưa cấu hình Cloudinary. Đặt CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET trong backend/.env.",
            });
        }
        upload.single("image")(req, res, (err) => {
            if (err) return res.status(400).json({ error: err.message });
            next();
        });
    },
    asyncH(uploadImage)
);

// DELETE /api/uploads/image — xoá ảnh khỏi Cloudinary theo public_id
router.delete(
    "/image",
    adminOnly,
    asyncH(deleteImage)
);

export default router;
