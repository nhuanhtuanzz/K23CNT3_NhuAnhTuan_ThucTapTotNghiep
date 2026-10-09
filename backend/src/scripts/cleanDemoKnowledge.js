require("dotenv").config();

const connectDB = require("../config/db");

const KnowledgeDocument = require("../models/knowledgeDocument.model");
const KnowledgeChunk = require("../models/knowledgeChunk.model");

const cleanDemoKnowledge = async () => {
  try {
    await connectDB();

    console.log("Đang tìm demo knowledge...");

    const demoDocuments = await KnowledgeDocument.find({
      source: "admission-2026-demo",
    });

    console.log(
      `Tìm thấy ${demoDocuments.length} demo document(s)`
    );

    for (const document of demoDocuments) {
      const result = await KnowledgeChunk.deleteMany({
        documentId: document._id,
      });

      console.log(
        `Đã xóa ${result.deletedCount} chunks của ${document._id}`
      );

      await KnowledgeDocument.deleteOne({
        _id: document._id,
      });

      console.log(
        `Đã xóa document: ${document.title}`
      );
    }

    console.log("\nDọn demo thành công!");

    process.exit(0);
  } catch (error) {
    console.error("Clean demo error:", error);
    process.exit(1);
  }
};

cleanDemoKnowledge();