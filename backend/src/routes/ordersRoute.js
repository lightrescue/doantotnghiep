import { Router } from "express";
import { authRequired, adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    createOrder,
    getMyOrders,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    updatePaymentMethod
} from "../controllers/ordersController.js";

const router = Router();

router.post("/", authRequired, asyncH(createOrder));

router.get("/me", authRequired, asyncH(getMyOrders));

router.get("/", adminOnly, asyncH(getOrders));

router.get("/:id", authRequired, asyncH(getOrderById));

router.patch("/:id/status", adminOnly, asyncH(updateOrderStatus));

router.patch("/:id/cancel", authRequired, asyncH(cancelOrder));

router.patch("/:id/payment-method", authRequired, asyncH(updatePaymentMethod));

export default router;
