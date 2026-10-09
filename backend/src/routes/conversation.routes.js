const express = require("express");

const {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
} = require("../controllers/conversation.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

// POST /api/conversations
router.post("/", createConversation);

// GET /api/conversations
router.get("/", getConversations);

// GET /api/conversations/:id
router.get("/:id", getConversationById);

// DELETE /api/conversations/:id
router.delete("/:id", deleteConversation);

module.exports = router;