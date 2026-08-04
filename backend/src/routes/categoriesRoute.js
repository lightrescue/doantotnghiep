import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoriesController.js";

const router = Router();

router.get("/", asyncH(getCategories));
router.post("/", adminOnly, asyncH(createCategory));
router.put("/:id", adminOnly, asyncH(updateCategory));
router.delete("/:id", adminOnly, asyncH(deleteCategory));

export default router;
