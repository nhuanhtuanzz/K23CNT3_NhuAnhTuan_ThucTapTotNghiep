const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const extractPdfText = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Không tìm thấy file PDF: ${filePath}`);
  }

  const dataBuffer = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: dataBuffer,
  });

  try {
    const result = await parser.getText();

    return result.text;
  } finally {
    await parser.destroy();
  }
};

module.exports = {
  extractPdfText,
};