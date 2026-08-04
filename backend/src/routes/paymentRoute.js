import { Router } from "express";
import { authRequired } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import { createPaymentUrl, verifyPayment } from "../controllers/paymentController.js";

const router = Router();

// 1. Tạo URL thanh toán
router.post("/vnpay/create-payment-url", authRequired, asyncH(createPaymentUrl));

// 2. Xác thực kết quả trả về từ VNPay
router.get("/vnpay/verify", asyncH(verifyPayment));

export default router;
