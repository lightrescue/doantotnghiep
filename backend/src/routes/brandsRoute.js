import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
} from "../controllers/brandsController.js";

const router = Router();

router.get("/", asyncH(getBrands));
router.post("/", adminOnly, asyncH(createBrand));
router.put("/:id", adminOnly, asyncH(updateBrand));
router.delete("/:id", adminOnly, asyncH(deleteBrand));

export default router;
