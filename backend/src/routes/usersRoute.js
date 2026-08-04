import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    getUsers,
    createUser,
    updateUser,
    lockUser,
    deleteUser
} from "../controllers/usersController.js";

const router = Router();

router.get("/", adminOnly, asyncH(getUsers));
router.post("/", adminOnly, asyncH(createUser));
router.put("/:id", adminOnly, asyncH(updateUser));
router.patch("/:id/lock", adminOnly, asyncH(lockUser));
router.delete("/:id", adminOnly, asyncH(deleteUser));

export default router;
