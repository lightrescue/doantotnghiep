import { Router } from "express";
import { authRequired, adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import { getReviews, createReview, deleteReview } from "../controllers/reviewsController.js";

const router = Router();

router.get("/", asyncH(getReviews));
router.post("/", authRequired, asyncH(createReview));
router.delete("/:id", adminOnly, asyncH(deleteReview));

export default router;
