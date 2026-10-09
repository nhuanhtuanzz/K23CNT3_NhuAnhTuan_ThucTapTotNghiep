import React, { useState } from "react";
import {
  Search,
  User,
  Bot,
  Trash2,
  Send,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  userName: string;
  phone?: string;
  firstQuestion: string;
  date: string;
  status: "answered" | "unresolved";
  messages: Message[];
}

export default function Conversations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeChatId, setActiveChatId] = useState("1");
  const [replyText, setReplyText] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      userName: "Thí sinh ẩn danh #1042",
      phone: "0982***321",
      firstQuestion: "Học phí ngành Công nghệ thông tin năm 2026 là bao nhiêu?",
      date: "14:25 - 29/09/2026",
      status: "answered",
      messages: [
        {
          id: "m1",
          sender: "user",
          text: "Học phí ngành Công nghệ thông tin năm 2026 là bao nhiêu ạ?",
          time: "14:25",
        },
        {
          id: "m2",
          sender: "bot",
          text: "Chào bạn! Theo thông báo tuyển sinh năm 2026, học phí ngành Công nghệ thông tin dự kiến khoảng 18.000.000đ - 22.000.000đ/học kỳ tùy thuộc vào chương trình tiêu chuẩn hoặc chất lượng cao.",
          time: "14:25",
        },
        {
          id: "m3",
          sender: "user",
          text: "Có phương thức xét học bạ không ad?",
          time: "14:26",
        },
        {
          id: "m4",
          sender: "bot",
          text: "Có bạn nhé! Trường dành 40% chỉ tiêu cho phương thức xét tuyển học bạ THPT (tổng điểm 3 môn tổ hợp lớp 12 từ 18.0 điểm trở lên).",
          time: "14:26",
        },
      ],
    },
    {
      id: "2",
      userName: "Thí sinh ẩn danh #1041",
      phone: "Chưa cung cấp",
      firstQuestion: "Trường có ký túc xá cho sinh viên năm nhất không?",
      date: "11:10 - 29/09/2026",
      status: "answered",
      messages: [
        {
          id: "m1",
          sender: "user",
          text: "Trường có ký túc xá cho sinh viên năm nhất không?",
          time: "11:10",
        },
        {
          id: "m2",
          sender: "bot",
          text: "Trường có khu ký túc xá khang trang, ưu tiên 100% sinh viên năm nhất ngoại tỉnh đăng ký trong đợt nhập học đầu tiên bạn nhé!",
          time: "11:10",
        },
      ],
    },
    {
      id: "3",
      userName: "Trần Bảo Nam",
      phone: "0912***889",
      firstQuestion: "Điểm chuẩn ngành Thiết kế đồ họa năm ngoái là bao nhiêu?",
      date: "09:40 - 29/09/2026",
      status: "unresolved",
      messages: [
        {
          id: "m1",
          sender: "user",
          text: "Điểm chuẩn ngành Thiết kế đồ họa năm ngoái là bao nhiêu?",
          time: "09:40",
        },
        {
          id: "m2",
          sender: "bot",
          text: "Xin lỗi bạn, tài liệu hiện tại chưa cập nhật điểm chuẩn năm trước của ngành Thiết kế đồ họa. Tư vấn viên sẽ liên hệ lại sớm nhất qua số điện thoại của bạn!",
          time: "09:40",
        },
      ],
    },
  ]);

  const activeChat =
    conversations.find((c) => c.id === activeChatId) || conversations[0];

  const handleSendManualReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "bot",
      text: replyText,
      time: "Vừa xong",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, newMsg], status: "answered" }
          : c
      )
    );
    setReplyText("");
  };

  const handleDeleteConversation = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hội thoại này?")) {
      const remaining = conversations.filter((c) => c.id !== id);
      setConversations(remaining);
      if (activeChatId === id && remaining.length > 0) {
        setActiveChatId(remaining[0].id);
      }
    }
  };

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.firstQuestion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Tiêu đề */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Lịch sử tư vấn & Hỏi đáp AI
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi tương tác trực tiếp của thí sinh với Chatbot, can thiệp giải đáp kịp thời.
          </p>
        </div>

        {/* Thống kê nhanh */}
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-slate-600">Đã trả lời:</span>
            <span className="text-sm font-bold text-slate-900">
              {conversations.filter((c) => c.status === "answered").length}
            </span>
          </div>
          <div className="bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-xs font-semibold text-slate-600">Cần hỗ trợ:</span>
            <span className="text-sm font-bold text-amber-600">
              {conversations.filter((c) => c.status === "unresolved").length}
            </span>
          </div>
        </div>
      </div>

      {/* Khung chat chia 2 cột */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[680px]">
        {/* ================= CỘT TRÁI: DANH SÁCH CUỘC HỘI THOẠI ================= */}
        <div className="lg:col-span-5 border-r border-slate-100 flex flex-col h-full bg-slate-50/50">
          {/* Tìm kiếm & Lọc */}
          <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Tìm hội thoại, số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatusFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  statusFilter === "ALL"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Tất cả ({conversations.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("unresolved")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  statusFilter === "unresolved"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Cần can thiệp ({conversations.filter((c) => c.status === "unresolved").length})
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((item) => {
                const isSelected = item.id === activeChatId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveChatId(item.id)}
                    className={`p-4 cursor-pointer transition ${
                      isSelected
                        ? "bg-white border-l-4 border-blue-600 shadow-sm"
                        : "hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                          {item.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 truncate max-w-[140px]">
                            {item.userName}
                          </p>
                          <p className="text-[11px] text-slate-400">{item.phone}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{item.date.split(" - ")[0]}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {item.firstQuestion}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between">
                      {item.status === "answered" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                          <CheckCircle2 size={13} /> Đã giải đáp
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-medium">
                          <HelpCircle size={13} /> Bot chưa trả lời được
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(item.id);
                        }}
                        className="text-slate-300 hover:text-red-500 p-1 transition"
                        title="Xóa đoạn chat"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Không tìm thấy phiên trò chuyện nào.
              </div>
            )}
          </div>
        </div>

        {/* ================= CỘT PHẢI: CHI TIẾT NỘI DUNG CHAT ================= */}
        <div className="lg:col-span-7 flex flex-col h-full bg-white">
          {activeChat ? (
            <>
              {/* Header đoạn chat */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {activeChat.userName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {activeChat.userName}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <span>SĐT: {activeChat.phone}</span>
                      <span>•</span>
                      <span>Thời gian: {activeChat.date}</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    activeChat.status === "answered"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {activeChat.status === "answered" ? "Tự động hoàn thành" : "Cần tư vấn hỗ trợ"}
                </span>
              </div>

              {/* Khung tin nhắn */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                        msg.sender === "user"
                          ? "bg-slate-800 text-white"
                          : "bg-blue-600 text-white shadow-sm"
                      }`}
                    >
                      {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div
                      className={`max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`block text-[10px] mt-1 text-right ${
                          msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Khung gửi phản hồi can thiệp */}
              <form
                onSubmit={handleSendManualReply}
                className="p-3 border-t border-slate-100 bg-white flex gap-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Nhập câu trả lời can thiệp từ tư vấn viên..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 transition shadow-sm"
                >
                  <Send size={14} />
                  <span>Gửi hỗ trợ</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
              Chọn một phiên hội thoại bên trái để xem nội dung.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}