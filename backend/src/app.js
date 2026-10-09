const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const conversationRoutes = require("./routes/conversation.routes");
const messageRoutes = require("./routes/message.routes");
const chatRoutes = require("./routes/chat.routes");
const knowledgeRoutes = require("./routes/knowledge.routes");
const errorMiddleware = require("./middleware/error.middleware");
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: "Quá nhiều request. Vui lòng thử lại sau.",
  },
});

// Auth
app.use(
  "/api/auth",
  authLimiter,
  authRoutes
);

// Users
app.use(
  "/api/users",
  userRoutes
);

// Conversations
app.use(
  "/api/conversations",
  conversationRoutes
);

// Messages
app.use(
  "/api/conversations",
  messageRoutes
);
// chat
app.use(
  "/api/chat",
  chatRoutes
);
app.use("/api/knowledge", knowledgeRoutes);
app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message: "API is running",
    });
  }
);
app.use(errorMiddleware);

module.exports = app;