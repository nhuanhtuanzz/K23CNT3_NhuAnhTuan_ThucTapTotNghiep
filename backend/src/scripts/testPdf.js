require("dotenv").config();

const path = require("path");

const {
  extractPdfText,
} = require("../services/pdf.service");

const testPdf = async () => {
  try {
    const filePath = path.join(
      __dirname,
      "../../data/admission-2026.pdf"
    );

    console.log("Đang đọc PDF...");

    const text = await extractPdfText(filePath);

    console.log("\n===== PDF TEXT =====\n");

    console.log(text.slice(0, 5000));

    console.log("\n====================");
    console.log(
      `Tổng số ký tự: ${text.length}`
    );

    process.exit(0);
  } catch (error) {
    console.error("PDF test error:", error);
    process.exit(1);
  }
};

testPdf();