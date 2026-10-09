const express = require("express");

const controller = require("../controllers/chat.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Không có token → guest
    if (!authHeader) {
      req.user = null;
      return next();
    }

    // Có token → xác thực admin
    authMiddleware(req, res, next);
  },
  controller.chat
);

module.exports = router;