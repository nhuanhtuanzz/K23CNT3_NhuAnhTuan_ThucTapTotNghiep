require("dotenv").config();

const path = require("path");

const connectDB = require("../config/db");

const KnowledgeDocument = require("../models/knowledgeDocument.model");
const KnowledgeChunk = require("../models/knowledgeChunk.model");

const {
  extractPdfText,
} = require("../services/pdf.service");

const {
  chunkText,
} = require("../services/chunking.service");

const importPdf = async () => {
  try {
    await connectDB();

    // =========================================
    // 1. PDF cần import
    // =========================================

    const fileName = "admission-2026.pdf";

    const filePath = path.join(
      __dirname,
      "../../data",
      fileName
    );

    console.log("=================================");
    console.log("BẮT ĐẦU IMPORT PDF");
    console.log("=================================");

    console.log(`\nFile: ${fileName}`);

    // =========================================
    // 2. Kiểm tra document cũ
    // =========================================

    console.log("\n[1] Kiểm tra document cũ...");

    const existingDocument =
      await KnowledgeDocument.findOne({
        source: fileName,
      });

    if (existingDocument) {
      console.log(
        `Đã tồn tại document: ${existingDocument._id}`
      );

      // Xóa toàn bộ chunk thuộc document cũ
      const deletedChunks =
        await KnowledgeChunk.deleteMany({
          documentId: existingDocument._id,
        });

      console.log(
        `Đã xóa ${deletedChunks.deletedCount} chunks cũ`
      );

      // Xóa document cũ
      await KnowledgeDocument.deleteOne({
        _id: existingDocument._id,
      });

      console.log("Đã xóa document cũ");
    } else {
      console.log(
        "Chưa có document cũ, tiến hành import mới."
      );
    }

    // =========================================
    // 3. Đọc PDF
    // =========================================

    console.log("\n[2] Đang đọc PDF...");

    const text = await extractPdfText(filePath);

    console.log(
      `Đã đọc ${text.length} ký tự`
    );

    if (!text.trim()) {
      throw new Error(
        "PDF không có nội dung."
      );
    }

    // =========================================
    // 4. Chia chunks
    // =========================================

    console.log("\n[3] Đang chia chunks...");

    const chunks = chunkText(text);

    console.log(
      `Đã tạo ${chunks.length} chunks`
    );

    if (chunks.length === 0) {
      throw new Error(
        "Không tạo được chunk nào từ PDF."
      );
    }

    // =========================================
    // 5. Tạo KnowledgeDocument
    // =========================================

    console.log(
      "\n[4] Đang tạo KnowledgeDocument..."
    );

    const document =
      await KnowledgeDocument.create({
        title:
          "Thông tin tuyển sinh đại học năm 2026",

        source: fileName,

        type: "pdf",

        description:
          "Dữ liệu được import tự động từ file PDF tuyển sinh năm 2026.",
      });

    console.log(
      "Document ID:",
      document._id.toString()
    );

    // =========================================
    // 6. Tạo KnowledgeChunks
    // =========================================

    console.log(
      "\n[5] Đang lưu KnowledgeChunks..."
    );

    const chunkDocuments = chunks.map(
      (content, index) => ({
        documentId: document._id,

        content,

        // Chưa embedding
        embedding: [],

        metadata: {
          chunkIndex: index,
          source: fileName,
        },
      })
    );

    await KnowledgeChunk.insertMany(
      chunkDocuments
    );

    console.log(
      `Đã lưu ${chunkDocuments.length} chunks`
    );

    // =========================================
    // 7. Hoàn tất
    // =========================================

    console.log("\n=================================");
    console.log("IMPORT PDF THÀNH CÔNG!");
    console.log("=================================");

    console.log(
      "Document ID:",
      document._id.toString()
    );

    console.log(
      "Source:",
      document.source
    );

    console.log(
      "Số lượng chunks:",
      chunks.length
    );

    console.log("\nBước tiếp theo:");

    console.log(
      "node src/scripts/embedKnowledge.js"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "\nImport PDF error:",
      error
    );

    process.exit(1);
  }
};

importPdf();