const axios = require("axios");

const OLLAMA_URL = "http://127.0.0.1:11434";
const EMBEDDING_MODEL = "nomic-embed-text";

const createEmbedding = async (text) => {
  if (!text || !text.trim()) {
    throw new Error("Text để tạo embedding không được để trống");
  }

  try {
    const response = await axios.post(
      `${OLLAMA_URL}/api/embeddings`,
      {
        model: EMBEDDING_MODEL,
        prompt: text.trim(),
      }
    );

    return response.data.embedding;
  } catch (error) {
    console.error(
      "Embedding error:",
      error.response?.data || error.message
    );

    throw new Error(
      "Không thể tạo embedding. Hãy kiểm tra Ollama."
    );
  }
};

module.exports = {
  createEmbedding,
};