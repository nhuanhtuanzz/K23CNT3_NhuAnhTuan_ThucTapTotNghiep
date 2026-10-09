const express = require("express");

const controller = require("../controllers/message.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/:conversationId/messages",
  authMiddleware,
  controller.createMessage
);

module.exports = router;