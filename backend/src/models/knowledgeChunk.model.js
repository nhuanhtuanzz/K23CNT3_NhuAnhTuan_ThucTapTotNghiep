const mongoose = require("mongoose");

const knowledgeChunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KnowledgeDocument",
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    embedding: {
      type: [Number],
      default: [],
    },

    metadata: {
      page: {
        type: Number,
        default: null,
      },

      chunkIndex: {
        type: Number,
        default: 0,
      },

      source: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "KnowledgeChunk",
  knowledgeChunkSchema
);