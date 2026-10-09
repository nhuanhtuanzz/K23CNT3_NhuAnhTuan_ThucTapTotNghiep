const fs = require("fs/promises");
const os = require("os");
const path = require("path");

const KnowledgeDocument = require("../models/knowledgeDocument.model");
const KnowledgeChunk = require("../models/knowledgeChunk.model");

const {
  extractPdfText,
} = require("../services/pdf.service");

const {
  chunkText,
} = require("../services/chunking.service");

const {
  createEmbedding,
} = require("../services/embedding.service");

// =========================================
// Lấy danh sách knowledge documents
// =========================================

const getKnowledgeDocuments = async (req, res, next) => {
  try {
    const documents = await KnowledgeDocument.aggregate([
      {
        $lookup: {
          from: "knowledgechunks",
          localField: "_id",
          foreignField: "documentId",
          as: "chunks",
        },
      },
      {
        $addFields: {
          chunkCount: {
            $size: "$chunks",
          },
        },
      },
      {
        $project: {
          chunks: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

// =========================================
// Import PDF
// =========================================

const importKnowledgePdf = async (req, res, next) => {
  let tempFilePath = null;

  try {
    // -----------------------------------------
    // 1. Kiểm tra file
    // -----------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng chọn file PDF",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Chỉ hỗ trợ file PDF",
      });
    }

    const fileName = req.file.originalname;

    console.log("=================================");
    console.log("BẮT ĐẦU IMPORT PDF");
    console.log("=================================");
    console.log("File:", fileName);

    // -----------------------------------------
    // 2. Lưu PDF tạm
    // -----------------------------------------

    tempFilePath = path.join(
      os.tmpdir(),
      `${Date.now()}-${fileName}`
    );

    await fs.writeFile(
      tempFilePath,
      req.file.buffer
    );

    console.log("Đã lưu file tạm:", tempFilePath);

    // -----------------------------------------
    // 3. Đọc PDF
    // -----------------------------------------

    console.log("\n[1] Đang đọc PDF...");

    const text = await extractPdfText(
      tempFilePath
    );

    console.log(
      `Đã đọc ${text.length} ký tự`
    );

    if (!text.trim()) {
      throw new Error(
        "PDF không có nội dung."
      );
    }

    // -----------------------------------------
    // 4. Chia chunks
    // -----------------------------------------

    console.log("\n[2] Đang chia chunks...");

    const chunks = chunkText(text);

    console.log(
      `Đã tạo ${chunks.length} chunks`
    );

    if (chunks.length === 0) {
      throw new Error(
        "Không tạo được chunk nào từ PDF."
      );
    }

    // -----------------------------------------
    // 5. Xóa document cũ cùng source
    // -----------------------------------------

    console.log(
      "\n[3] Kiểm tra document cũ..."
    );

    const existingDocument =
      await KnowledgeDocument.findOne({
        source: fileName,
      });

    if (existingDocument) {
      console.log(
        `Đã tồn tại document: ${existingDocument._id}`
      );

      const deletedChunks =
        await KnowledgeChunk.deleteMany({
          documentId: existingDocument._id,
        });

      console.log(
        `Đã xóa ${deletedChunks.deletedCount} chunks cũ`
      );

      await KnowledgeDocument.deleteOne({
        _id: existingDocument._id,
      });

      console.log("Đã xóa document cũ");
    }

    // -----------------------------------------
    // 6. Tạo KnowledgeDocument
    // -----------------------------------------

    console.log(
      "\n[4] Đang tạo KnowledgeDocument..."
    );

    const document =
      await KnowledgeDocument.create({
        title: fileName,

        source: fileName,

        type: "pdf",

        description:
          `Dữ liệu được import từ file PDF ${fileName}.`,
      });

    console.log(
      "Document ID:",
      document._id.toString()
    );

    // -----------------------------------------
    // 7. Tạo chunks
    // -----------------------------------------

    console.log(
      "\n[5] Đang lưu KnowledgeChunks..."
    );

    const chunkDocuments = chunks.map(
      (content, index) => ({
        documentId: document._id,

        content,

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

    // -----------------------------------------
    // 8. Tạo embedding
    // -----------------------------------------

    console.log(
      "\n[6] Đang tạo embeddings..."
    );

    for (
      let i = 0;
      i < chunkDocuments.length;
      i++
    ) {
      const chunk = chunkDocuments[i];

      console.log(
        `Embedding ${i + 1}/${chunkDocuments.length}...`
      );

      const embedding =
        await createEmbedding(
          chunk.content
        );

      await KnowledgeChunk.updateOne(
        {
          _id: chunk._id,
        },
        {
          $set: {
            embedding,
          },
        }
      );
    }

    console.log(
      "\nEmbedding hoàn tất!"
    );

    // -----------------------------------------
    // 9. Hoàn tất
    // -----------------------------------------

    console.log("\n=================================");
    console.log("IMPORT PDF THÀNH CÔNG!");
    console.log("=================================");

    return res.status(201).json({
      success: true,
      message: "Import PDF thành công",
      data: {
        documentId: document._id,
        fileName,
        chunkCount: chunkDocuments.length,
      },
    });
  } catch (error) {
    console.error(
      "Import knowledge PDF error:",
      error
    );

    next(error);
  } finally {
    // -----------------------------------------
    // Xóa file tạm
    // -----------------------------------------

    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (error) {
        console.error(
          "Không thể xóa file tạm:",
          error.message
        );
      }
    }
  }
};

// =========================================
// Xóa knowledge document
// =========================================

const deleteKnowledgeDocument = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const document =
      await KnowledgeDocument.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message:
          "Không tìm thấy tài liệu knowledge",
      });
    }

    await KnowledgeChunk.deleteMany({
      documentId: document._id,
    });

    await KnowledgeDocument.deleteOne({
      _id: document._id,
    });

    res.status(200).json({
      success: true,
      message:
        "Đã xóa tài liệu knowledge",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getKnowledgeDocuments,
  importKnowledgePdf,
  deleteKnowledgeDocument,
};