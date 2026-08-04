import { Router } from "express";
import { adminOnly } from "../middleware/auth.js";
import { asyncH } from "../middleware/error.js";
import {
    getChatbotConfig,
    getChatbotStatus,
    chatGemini,
    updateChatbotConfig,
    updateChatbotQuickReplies,
    addChatbotRule,
    deleteChatbotRule
} from "../controllers/chatbotController.js";

const router = Router();

// ============================================================
// GET /api/chatbot - cấu hình hiển thị
// ============================================================
router.get("/", asyncH(getChatbotConfig));

// ============================================================
// GET /api/chatbot/status - kiểm tra Gemini hoạt động (debug)
// ============================================================
router.get("/status", asyncH(getChatbotStatus));

// ============================================================
// POST /api/chatbot/chat - gửi tin nhắn tới Gemini
// ============================================================
router.post("/chat", asyncH(chatGemini));

// ============================================================
// Admin endpoints
// ============================================================
router.put("/config", adminOnly, asyncH(updateChatbotConfig));

router.put("/quick-replies", adminOnly, asyncH(updateChatbotQuickReplies));

router.post("/rules", adminOnly, asyncH(addChatbotRule));

router.delete("/rules/:id", adminOnly, asyncH(deleteChatbotRule));

export default router;
