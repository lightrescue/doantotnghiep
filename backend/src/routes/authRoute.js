import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    register,
    login,
    getMe,
    updateMe,
    updateMyPassword,
    forgotPassword,
    resetPassword,
    verifyResetToken
} from "../controllers/authController.js";

const router = Router();

router.post("/register", asyncH(register));
router.post("/login", asyncH(login));
router.get("/me", authRequired, asyncH(getMe));
router.put("/me", authRequired, asyncH(updateMe));
router.put("/me/password", authRequired, asyncH(updateMyPassword));

// ============================================================
// QUÊN MẬT KHẨU
// ============================================================

// Bước 1: Yêu cầu reset - tạo token, lưu DB, trả link
// (Trong production sẽ gửi link qua email; demo trả thẳng cho frontend hiển thị)
router.post("/forgot-password", asyncH(forgotPassword));

// Bước 2: Verify token + đặt mật khẩu mới
router.post("/reset-password", asyncH(resetPassword));

// Verify token (dùng khi mở trang reset để check token trước)
router.get("/reset-password/verify", asyncH(verifyResetToken));

export default router;
