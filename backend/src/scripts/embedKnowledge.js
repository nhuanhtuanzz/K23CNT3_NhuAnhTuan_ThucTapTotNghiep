require("dotenv").config();

const connectDB = require("../config/db");

const KnowledgeChunk = require("../models/knowledgeChunk.model");

const {
  createEmbedding,
} = require("../services/embedding.service");

const embedKnowledge = async () => {
  try {
    await connectDB();

    // Chỉ lấy chunk chưa có embedding
    const chunks = await KnowledgeChunk.find({
      $or: [
        { embedding: { $exists: false } },
        { embedding: { $size: 0 } },
      ],
    });

    console.log(
      `Tìm thấy ${chunks.length} chunks chưa embedding`
    );

    if (chunks.length === 0) {
      console.log(
        "Không có chunk nào cần embedding."
      );

      process.exit(0);
    }

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      console.log(
        `Embedding ${i + 1}/${chunks.length}...`
      );

      const embedding =
        await createEmbedding(chunk.content);

      chunk.embedding = embedding;

      await chunk.save();

      console.log(
        `Đã lưu embedding cho chunk ${chunk._id}`
      );
    }

    console.log(
      "\nEmbedding knowledge thành công!"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Embed knowledge error:",
      error
    );

    process.exit(1);
  }
};

embedKnowledge();