import { v2 as cloudinary } from "cloudinary";

// Cấu hình Cloudinary từ env
export const configureCloudinary = () => {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) return false;
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
        secure: true,
    });
    return true;
};

export const isCloudinaryReady = () =>
    !!(process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET);

export const uploadBufferToCloudinary = (buffer, folder = "viqitech") =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
                transformation: [
                    { quality: "auto:good", fetch_format: "auto" }, // tự WebP nếu browser hỗ trợ
                ],
            },
            (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(buffer);
    });

export const getUploadStatus = (req, res) => {
    res.json({
        ok: isCloudinaryReady(),
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
    });
};

export const uploadImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Thiếu file (field name: image)." });

    const folder = (req.body.folder || "viqitech/products").replace(/[^a-zA-Z0-9_/-]/g, "");
    const result = await uploadBufferToCloudinary(req.file.buffer, folder);

    res.status(201).json({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
    });
};

export const deleteImage = async (req, res) => {
    if (!configureCloudinary()) {
        return res.status(500).json({ error: "Chưa cấu hình Cloudinary." });
    }
    const { publicId } = req.body || {};
    if (!publicId) return res.status(400).json({ error: "Thiếu publicId." });
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ ok: result.result === "ok", result });
};
