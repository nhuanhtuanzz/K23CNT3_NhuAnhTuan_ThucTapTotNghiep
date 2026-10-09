const express = require("express");

const {
  getUsers,
  createUser,
  deleteUser,
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

// Tất cả API user management đều yêu cầu đăng nhập + quyền admin
router.use(authMiddleware);
router.use(adminMiddleware);

// Lấy danh sách tài khoản
router.get("/", getUsers);

// Tạo tài khoản
router.post("/", createUser);

// Xóa tài khoản
router.delete("/:id", deleteUser);

module.exports = router;