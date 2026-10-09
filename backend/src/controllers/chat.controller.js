const mongoose = require("mongoose");

const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const {
  retrieveRelevantChunks,
} = require("../services/retrieval.service");
const {
  detectQuestionIntent,
} = require("../services/questionIntent.service");
const {
  generateAnswer,
} = require("../services/generation.service");

const chat = async (req, res, next) => {
  try {
    const { conversationId, content } = req.body;

    // =========================
    // 1. Validate content
    // =========================
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nội dung tin nhắn không được để trống",
      });
    }

    // =========================
    // 2. Tìm hoặc tạo conversation
    // =========================
    let conversation;

    if (conversationId) {
      if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({
          success: false,
          message: "conversationId không hợp lệ",
        });
      }

      // =========================
      // Guest
      // =========================
      if (!req.user) {
        conversation = await Conversation.findOne({
          _id: conversationId,
          userId: null,
        });
      }

      // =========================
      // Admin
      // =========================
      else {
        conversation = await Conversation.findOne({
          _id: conversationId,
          userId: req.user.sub,
        });
      }

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy cuộc trò chuyện",
        });
      }
    }

    // =========================
    // Nếu chưa có conversation
    // → tạo conversation mới
    // =========================
    if (!conversation) {
      conversation = await Conversation.create({
        userId: req.user ? req.user.sub : null,
        title: content.trim().slice(0, 50),
      });
    }

    // =========================
    // 3. Lưu user message
    // =========================
    const userMessage = await Message.create({
      conversationId: conversation._id,
      role: "user",
      content: content.trim(),
    });

    // =========================
    // 4. Lấy lịch sử conversation
    // =========================
    const previousMessages = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: 1 })
      .limit(10)
      .lean();

    console.log("Đang retrieval...");

    // =========================
    // 5. Tạo retrieval query
    // =========================
const retrievalQuery = content.trim();

console.log("Retrieval query:");
console.log(retrievalQuery);

// =========================
// Phân loại câu hỏi
// =========================
const intent = detectQuestionIntent(
  retrievalQuery
);

console.log("Question intent:");
console.log(intent);

const relevantChunks = await retrieveRelevantChunks(
  retrievalQuery,
  5,
  intent
);

    console.log(
      `Tìm thấy ${relevantChunks.length} knowledge chunks`
    );

    // =========================
    // 6. Tạo context
    // =========================
    const context = relevantChunks
      .map((chunk, index) => {
        return `[Thông tin ${index + 1}]
${chunk.content}`;
      })
      .join("\n\n");

    // =========================
    // 7. Generation
    // =========================
    console.log("Đang generation...");

    let assistantContent;

    if (!context) {
      assistantContent =
        "Xin lỗi, tôi chưa tìm thấy thông tin phù hợp trong dữ liệu tuyển sinh.";
    } else {
      assistantContent = await generateAnswer(
        retrievalQuery,
        context
      );
    }

    console.log("Generation hoàn tất.");

    // =========================
    // 8. Lưu assistant message
    // =========================
    const assistantMessage = await Message.create({
      conversationId: conversation._id,
      role: "assistant",
      content: assistantContent,
    });

    // =========================
    // 9. Update conversation
    // =========================
    conversation.updatedAt = new Date();

    await conversation.save();

    // =========================
    // 10. Response
    // =========================
    res.status(200).json({
      success: true,
      data: {
        conversationId: conversation._id,
        userMessage,
        assistantMessage,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    next(error);
  }
};

module.exports = {
  chat,
};