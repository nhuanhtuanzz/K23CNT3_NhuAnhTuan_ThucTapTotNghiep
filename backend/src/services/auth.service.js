const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const {
  generateRandomToken,
  hashToken,
} = require("../utils/otp");

const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("./email.service");
// Signup
const signup = async ({
  name,
  email,
  password,
}) => {
  email = email.toLowerCase().trim();

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new Error("Email đã được đăng ký");
  }

  const passwordHash = await bcrypt.hash(
    password,
    12
  );

  const verifyToken =
    generateRandomToken(32);

  const user = await User.create({
    name,
    email,
    password: passwordHash,

    emailVerifyToken:
      hashToken(verifyToken),

    emailVerifyExpires:
      new Date(
        Date.now() +
        Number(
          process.env.EMAIL_VERIFY_EXPIRES_MINUTES || 15
        ) *
        60 *
        1000
      ),
  });

  await sendVerificationEmail(
    email,
    name,
    verifyToken
  );

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

// 12. Verify Email
const verifyEmail = async (token) => {
  const tokenHash = hashToken(token);

  const user = await User.findOne({
    emailVerifyToken: tokenHash,

    emailVerifyExpires: {
      $gt: new Date(),
    },
  }).select(
    "+emailVerifyToken +emailVerifyExpires"
  );

  if (!user) {
    throw new Error(
      "Token xác thực không hợp lệ hoặc đã hết hạn"
    );
  }

  user.isEmailVerified = true;

  user.emailVerifyToken = undefined;
  user.emailVerifyExpires = undefined;

  await user.save();

  return true;
};

// 13. Signin
const signin = async ({
  email,
  password,
}) => {
  console.log("========== LOGIN DEBUG ==========");

  console.log("Email nhận được:", email);
  console.log("Password nhận được:", password);

  email = email.toLowerCase().trim();

  console.log("Email sau khi xử lý:", email);

  const user = await User.findOne({
    email,
  }).select(
    "+password +refreshTokenHash"
  );

  console.log(
    "User tìm thấy:",
    user
      ? {
          id: user._id,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          hasPassword: !!user.password,
          passwordPrefix: user.password
            ? user.password.substring(0, 7)
            : null,
        }
      : null
  );

  if (!user) {
    console.log("❌ KHÔNG TÌM THẤY USER");

    throw new Error(
      "Email hoặc mật khẩu không đúng"
    );
  }

  const passwordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  console.log(
    "Password matched:",
    passwordMatched
  );

  if (!passwordMatched) {
    console.log("❌ PASSWORD KHÔNG KHỚP");

    throw new Error(
      "Email hoặc mật khẩu không đúng"
    );
  }

  console.log("✅ PASSWORD ĐÚNG");

  

  const accessToken =
    generateAccessToken(user);

  const refreshToken =
    generateRefreshToken(user);

  user.refreshTokenHash =
    await bcrypt.hash(refreshToken, 12);

  user.lastLoginAt = new Date();

  await user.save();

  console.log("✅ LOGIN THÀNH CÔNG");
  console.log("================================");

  return {
    accessToken,
    refreshToken,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// 14. Refresh Token
// Đây là phần rất quan trọng.
// Không nên chỉ:
// jwt.verify(refreshToken)
// mà phải kiểm tra refresh token có thực sự thuộc session/user hay không.
const refreshAccessToken = async (
  refreshToken
) => {
  if (!refreshToken) {
    throw new Error(
      "Refresh token không tồn tại"
    );
  }

  let payload;

  try {
    payload =
      verifyRefreshToken(refreshToken);
  } catch {
    throw new Error(
      "Refresh token không hợp lệ hoặc đã hết hạn"
    );
  }

  if (payload.type !== "refresh") {
    throw new Error("Token không hợp lệ");
  }

  const user = await User.findById(
    payload.sub
  ).select("+refreshTokenHash");

  if (
    !user ||
    !user.refreshTokenHash
  ) {
    throw new Error(
      "Refresh token không hợp lệ"
    );
  }

  const matched =
    await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash
    );

  if (!matched) {
    throw new Error(
      "Refresh token không hợp lệ"
    );
  }

  const accessToken =
    generateAccessToken(user);

  const newRefreshToken =
    generateRefreshToken(user);

  user.refreshTokenHash =
    await bcrypt.hash(
      newRefreshToken,
      12
    );

  await user.save();

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
// 15. Forgot Password
const forgotPassword = async (
  email
) => {
  email = email.toLowerCase().trim();

  const user = await User.findOne({
    email,
  });


  if (!user) {
    return true;
  }

  const token =
    generateRandomToken(32);

  user.passwordResetTokenHash =
    hashToken(token);

  user.passwordResetExpires =
    new Date(
      Date.now() +
      Number(
        process.env.RESET_PASSWORD_EXPIRES_MINUTES || 15
      ) *
      60 *
      1000
    );

  await user.save();

  await sendPasswordResetEmail(
    user.email,
    user.name,
    token
  );

  return true;
};

// 16. Verify Forgot Password
const verifyForgotPassword = async (
  token
) => {
  const tokenHash = hashToken(token);

  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,

    passwordResetExpires: {
      $gt: new Date(),
    },
  }).select(
    "+passwordResetTokenHash +passwordResetExpires"
  );

  if (!user) {
    throw new Error(
      "Token reset password không hợp lệ hoặc đã hết hạn"
    );
  }

  return {
    valid: true,
  };
};

// 17. Reset Password
const resetPassword = async (
  token,
  newPassword
) => {
  const tokenHash = hashToken(token);

  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,

    passwordResetExpires: {
      $gt: new Date(),
    },
  }).select(
    "+passwordResetTokenHash +passwordResetExpires +refreshTokenHash"
  );

  if (!user) {
    throw new Error(
      "Token reset password không hợp lệ hoặc đã hết hạn"
    );
  }

  user.password =
    await bcrypt.hash(
      newPassword,
      12
    );

  user.passwordResetTokenHash =
    undefined;

  user.passwordResetExpires =
    undefined;

  /*
   Đăng xuất tất cả session
   sau khi đổi password.
  */
  user.refreshTokenHash =
    undefined;

  await user.save();

  return true;
};

// 18. Signout
const signout = async (userId) => {
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshTokenHash: 1,
      },
    }
  );

  return true;
};

// 19. Export Service

module.exports = {
  signup,
  verifyEmail,
  signin,
  refreshAccessToken,
  forgotPassword,
  verifyForgotPassword,
  resetPassword,
  signout,
};
