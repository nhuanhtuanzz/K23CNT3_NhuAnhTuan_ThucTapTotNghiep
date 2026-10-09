const KnowledgeChunk = require("../models/knowledgeChunk.model");
const { createEmbedding } = require("./embedding.service");

const cosineSimilarity = (vectorA, vectorB) => {
  if (
    !Array.isArray(vectorA) ||
    !Array.isArray(vectorB) ||
    vectorA.length !== vectorB.length
  ) {
    return 0;
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];

    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return (
    dotProduct /
    (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB))
  );
};

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};


const retrieveRelevantChunks = async (
  query,
  topK = 5,
  intent = null
) => {
  if (!query || !query.trim()) {
    return [];
  }

  const normalizedQuery = normalizeText(query);

  // ==========================================
  // 1. Tạo embedding cho câu hỏi
  // ==========================================

  const queryEmbedding = await createEmbedding(query);

  // ==========================================
  // 2. Lấy knowledge chunks
  // ==========================================

  const chunks = await KnowledgeChunk.find({
    embedding: { $exists: true, $ne: [] },
  }).lean();

  if (chunks.length === 0) {
    return [];
  }

  // ==========================================
  // 3. Tính similarity
  // ==========================================

  let results = chunks.map((chunk) => {
    const score = cosineSimilarity(
      queryEmbedding,
      chunk.embedding
    );

    return {
      ...chunk,
      score,
    };
  });

  // ==========================================
  // 6. Sắp xếp similarity
  // ==========================================

  results.sort((a, b) => b.score - a.score);

  // ==========================================
  // 7. Threshold
  // ==========================================

  const SIMILARITY_THRESHOLD = 0.6;

  const relevantResults = results.filter(
    (item) => item.score >= SIMILARITY_THRESHOLD
  );

  // ==========================================
  // 8. Nếu hỏi danh sách ngành
  // ==========================================

  const isListQuestion =
    normalizedQuery.includes("cac nganh") ||
    normalizedQuery.includes("nhung nganh") ||
    normalizedQuery.includes("tat ca nganh") ||
    normalizedQuery.includes("liet ke") ||
    normalizedQuery.includes("gom nhung") ||
    normalizedQuery.includes("gom cac") ||
    normalizedQuery.includes("co nhung") ||
    normalizedQuery.includes("nganh nao");

  const limit = isListQuestion ? 8 : topK;

  return relevantResults.slice(0, limit);
};

module.exports = {
  retrieveRelevantChunks,
};