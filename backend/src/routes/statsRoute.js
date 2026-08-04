import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    getDashboardStats,
    getRevenueStats,
    getTopProducts
} from "../controllers/statsController.js";

const router = Router();

router.get("/dashboard", adminOnly, asyncH(getDashboardStats));
router.get("/revenue", adminOnly, asyncH(getRevenueStats));
router.get("/top-products", adminOnly, asyncH(getTopProducts));

export default router;
