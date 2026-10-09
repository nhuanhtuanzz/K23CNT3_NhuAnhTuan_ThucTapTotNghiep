import { useEffect, useRef, useState } from "react";
import api from "../../services/api";

interface Message {
  id: number | string;
  role: "user" | "assistant";
  content: string;
}

const initialMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "Xin chào! 👋 Tôi là trợ lý tuyển sinh. Bạn muốn tìm hiểu về ngành học, học phí, phương thức xét tuyển hay hồ sơ?",
};

const suggestedQuestions = [
  "Các ngành đào tạo năm 2026 gồm những ngành nào?",
  "Ngành Công nghệ thông tin học những gì?",
  "Các phương thức xét tuyển năm 2026 là gì?",
  "Hồ sơ đăng ký xét tuyển cần những gì?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    initialMessage,
  ]);

  const [conversationId, setConversationId] =
    useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedConversationId = localStorage.getItem(
      "guestConversationId"
    );

    if (savedConversationId) {
      setConversationId(savedConversationId);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading, isOpen]);

  const handleSend = async (messageContent?: string) => {
    const content = (
      messageContent !== undefined ? messageContent : input
    ).trim();

    if (!content || loading) return;

    setInput("");
    setError("");

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const accessToken =
        localStorage.getItem("accessToken");

      const headers: Record<string, string> = {};

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await api.post(
        "/chat",
        {
          conversationId,
          content,
        },
        {
          headers,
        }
      );

      const data = response.data.data;

      setConversationId(data.conversationId);

      if (!accessToken) {
        localStorage.setItem(
          "guestConversationId",
          data.conversationId
        );
      }

      const assistantMessage: Message = {
        id:
          data.assistantMessage?._id ||
          Date.now() + 1,

        role: "assistant",

        content:
          data.assistantMessage?.content ||
          "Xin lỗi, tôi chưa có câu trả lời.",
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error: any) {
      console.error("Chat error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Có lỗi xảy ra. Vui lòng thử lại.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-ai-chat", handleOpenChat);

    return () => {
      window.removeEventListener(
        "open-ai-chat",
        handleOpenChat
      );
    };
  }, []);
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        ...initialMessage,
        id: Date.now(),
      },
    ]);

    setConversationId(null);

    localStorage.removeItem(
      "guestConversationId"
    );

    setInput("");
    setError("");
  };

  const showSuggestedQuestions =
    messages.length === 1 && !loading;

  return (
    <>
      {/* =====================================================
          CHAT WINDOW
      ====================================================== */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6">

          {/* =================================================
              HEADER
          ================================================== */}
          <div className="flex shrink-0 items-center justify-between bg-blue-600 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
                🤖
              </div>

              <div>
                <p className="font-semibold">
                  Trợ lý tuyển sinh
                </p>

                <p className="text-xs text-blue-100">
                  Hỏi đáp tuyển sinh 2026
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleNewChat}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-lg transition hover:bg-white/20"
                title="Cuộc trò chuyện mới"
              >
                ↻
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-lg transition hover:bg-white/20"
                title="Đóng"
              >
                ✕
              </button>
            </div>
          </div>

          {/* =================================================
              MESSAGES
          ================================================== */}
          <div className="flex-1 overflow-y-auto bg-slate-50 px-3 py-4">
            <div className="space-y-3">

              {messages.map((message) => {
                const isUser =
                  message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser
                        ? "justify-end"
                        : "justify-start"
                      }`}
                  >
                    {!isUser && (
                      <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs">
                        🤖
                      </div>
                    )}

                    <div
                      className={`
                        max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-5
                        ${isUser
                          ? "rounded-br-md bg-blue-600 text-white"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                        }
                      `}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}

              {/* =================================================
                  SUGGESTED QUESTIONS
              ================================================== */}
              {showSuggestedQuestions && (
                <div className="pt-2">
                  <p className="mb-2 px-1 text-xs font-medium text-slate-500">
                    Bạn có thể hỏi:
                  </p>

                  <div className="space-y-2">
                    {suggestedQuestions.map(
                      (question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() =>
                            handleSend(question)
                          }
                          disabled={loading}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-xs leading-5 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {question}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* =================================================
                  LOADING
              ================================================== */}
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs">
                    🤖
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{
                          animationDelay: "150ms",
                        }}
                      />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{
                          animationDelay: "300ms",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  ERROR
              ================================================== */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* =================================================
              INPUT
          ================================================== */}
          <div className="shrink-0 border-t bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                value={input}
                disabled={loading}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
              />

              <button
                onClick={() => handleSend()}
                disabled={
                  loading || !input.trim()
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                title="Gửi"
              >
                ➤
              </button>
            </div>

            <p className="mt-1.5 text-center text-[10px] text-slate-400">
              Thông tin được cung cấp dựa trên dữ liệu tuyển sinh.
            </p>
          </div>
        </div>
      )}

      {/* =====================================================
          FLOATING BUTTON
      ====================================================== */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-xl transition hover:scale-105 hover:bg-blue-700 sm:right-6"
          aria-label="Hỏi AI"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xl">
            🤖
          </span>

          <span className="font-semibold">
            Hỏi AI
          </span>
        </button>
      )}
    </>
  );
}