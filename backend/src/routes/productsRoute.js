import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productsController.js";

const router = Router();

router.get("/", asyncH(getProducts));
router.get("/:id", asyncH(getProductById));
router.post("/", adminOnly, asyncH(createProduct));
router.put("/:id", adminOnly, asyncH(updateProduct));
router.delete("/:id", adminOnly, asyncH(deleteProduct));

export default router;
