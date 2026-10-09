const chunkText = (
  text,
  chunkSize = 1000,
  overlap = 150
) => {
  if (!text || !text.trim()) {
    return [];
  }

  let cleanText = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/--\s*\d+\s+of\s+\d+\s*--/gi, "")
    .trim();

  const chunks = [];

  let start = 0;

  while (start < cleanText.length) {
    let end = Math.min(
      start + chunkSize,
      cleanText.length
    );

    if (end < cleanText.length) {
      // Ưu tiên kết thúc ở cuối câu
      const sentenceEnd = Math.max(
        cleanText.lastIndexOf(". ", end),
        cleanText.lastIndexOf("? ", end),
        cleanText.lastIndexOf("! ", end)
      );

      if (sentenceEnd > start + 500) {
        end = sentenceEnd + 1;
      } else {
        // Nếu không tìm được cuối câu,
        // tìm khoảng trắng gần nhất
        const lastSpace = cleanText.lastIndexOf(
          " ",
          end
        );

        if (lastSpace > start) {
          end = lastSpace;
        }
      }
    }

    const chunk = cleanText
      .slice(start, end)
      .trim();

    if (chunk) {
      chunks.push(chunk);
    }

    if (end >= cleanText.length) {
      break;
    }

    start = end - overlap;
  }

  return chunks;
};

module.exports = {
  chunkText,
};