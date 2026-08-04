import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import { getLogs, getLowStock, adjustInventory } from "../controllers/inventoryController.js";

const router = Router();

// Lấy danh sách lịch sử biến động kho
router.get("/logs", adminOnly, asyncH(getLogs));

// Lấy danh sách sản phẩm sắp hết hàng (stock < 10)
router.get("/low-stock", adminOnly, asyncH(getLowStock));

// Điều chỉnh tồn kho thủ công (Nhập / Xuất)
router.post("/adjust", adminOnly, asyncH(adjustInventory));

export default router;
