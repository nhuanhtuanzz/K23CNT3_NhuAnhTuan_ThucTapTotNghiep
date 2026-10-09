const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

// Tạo cuộc trò chuyện mới
const createConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.create({
      userId: req.user.sub,
      title: "Cuộc trò chuyện mới",
    });

    res.status(201).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách cuộc trò chuyện của user
const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      userId: req.user.sub,
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy một cuộc trò chuyện + các message
const getConversationById = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.sub,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy cuộc trò chuyện",
      });
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: {
        conversation,
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Xóa cuộc trò chuyện
const deleteConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.sub,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy cuộc trò chuyện",
      });
    }

    // Xóa toàn bộ message thuộc conversation
    await Message.deleteMany({
      conversationId: conversation._id,
    });

    // Xóa conversation
    await Conversation.deleteOne({
      _id: conversation._id,
    });

    res.status(200).json({
      success: true,
      message: "Đã xóa cuộc trò chuyện",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
};