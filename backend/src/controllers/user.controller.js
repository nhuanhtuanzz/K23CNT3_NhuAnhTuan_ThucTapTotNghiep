const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// =========================================
// Lấy danh sách users
// =========================================

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select(
        "_id name email role isEmailVerified lastLoginAt createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// =========================================
// Tạo user
// =========================================

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // Kiểm tra dữ liệu
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Vui lòng nhập đầy đủ thông tin",
      });
    }

    // Kiểm tra role hợp lệ
    const allowedRoles = [
      "user",
      "admin",
      "sales",
      "teacher",
      "manager",
      "accountant",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role không hợp lệ",
      });
    }

    // Kiểm tra email đã tồn tại
    const existingUser =
      await User.findOne({
        email: email.trim().toLowerCase(),
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "Email đã được sử dụng",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "Tạo tài khoản thành công",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified:
          user.isEmailVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// =========================================
// Xóa user
// =========================================

const deleteUser = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const user =
      await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "Không tìm thấy tài khoản",
      });
    }

    // Không cho admin tự xóa chính mình
    if (
      req.user &&
      req.user.sub === user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Bạn không thể tự xóa tài khoản của mình",
      });
    }

    await User.deleteOne({
      _id: user._id,
    });

    res.status(200).json({
      success: true,
      message:
        "Đã xóa tài khoản",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};