import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    getVouchers,
    validateVoucher,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    toggleVoucherStatus
} from "../controllers/vouchersController.js";

const router = Router();

// ============================================================
// GET /api/vouchers - list
//   ?active=1: chỉ vouchers còn hiệu lực (public)
//   không có: tất cả (admin)
// ============================================================
router.get("/", asyncH(getVouchers));

// ============================================================
// POST /api/vouchers/validate - kiểm tra mã + tính giảm giá
// Body: { code, subtotal }
// ============================================================
router.post("/validate", asyncH(validateVoucher));

// ============================================================
// Admin CRUD
// ============================================================
router.post("/", adminOnly, asyncH(createVoucher));
router.put("/:id", adminOnly, asyncH(updateVoucher));
router.delete("/:id", adminOnly, asyncH(deleteVoucher));
router.patch("/:id/toggle", adminOnly, asyncH(toggleVoucherStatus));

export default router;
