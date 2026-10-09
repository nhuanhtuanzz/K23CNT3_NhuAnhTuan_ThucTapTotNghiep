require("dotenv").config();

const path = require("path");

const {
  extractPdfText,
} = require("../services/pdf.service");

const {
  chunkText,
} = require("../services/chunking.service");

const testChunking = async () => {
  try {
    const filePath = path.join(
      __dirname,
      "../../data/admission-2026.pdf"
    );

    console.log("Đang đọc PDF...");

    const text = await extractPdfText(filePath);

    console.log(
      `Đã đọc ${text.length} ký tự`
    );

    console.log("\nĐang chia chunks...\n");

    const chunks = chunkText(text);

    console.log(
      `Tạo được ${chunks.length} chunks`
    );

    chunks.forEach((chunk, index) => {
      console.log(
        `\n========== CHUNK ${index + 1} ==========\n`
      );

      console.log(chunk);

      console.log(
        `\nĐộ dài: ${chunk.length} ký tự`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error(
      "Chunking test error:",
      error
    );

    process.exit(1);
  }
};

testChunking();