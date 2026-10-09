const express = require("express");
const multer = require("multer");

const {
  getKnowledgeDocuments,
  importKnowledgePdf,
  deleteKnowledgeDocument,
} = require("../controllers/knowledge.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

// =========================================
// Multer
// =========================================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(
        new Error("Chỉ hỗ trợ file PDF")
      );
    }

    cb(null, true);
  },
});

// =========================================
// Authentication
// =========================================

router.use(authMiddleware);

router.use(adminMiddleware);

// =========================================
// GET /api/knowledge
// =========================================

router.get(
  "/",
  getKnowledgeDocuments
);

// =========================================
// POST /api/knowledge/import
// =========================================

router.post(
  "/import",
  upload.single("file"),
  importKnowledgePdf
);

// =========================================
// DELETE /api/knowledge/:id
// =========================================

router.delete(
  "/:id",
  deleteKnowledgeDocument
);

module.exports = router;