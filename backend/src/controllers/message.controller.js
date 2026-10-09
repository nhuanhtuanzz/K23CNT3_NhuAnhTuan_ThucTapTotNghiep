const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

// Gửi message vào conversation
const createMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;

    // Kiểm tra content
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nội dung tin nhắn không được để trống",
      });
    }

    // Kiểm tra conversation có thuộc user đang đăng nhập không
    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId: req.user.sub,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy cuộc trò chuyện",
      });
    }

    // Lưu message của user
    const message = await Message.create({
      conversationId: conversation._id,
      role: "user",
      content: content.trim(),
    });

    // Cập nhật thời gian conversation
    conversation.updatedAt = new Date();
    await conversation.save();

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
};