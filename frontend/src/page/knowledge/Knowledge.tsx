import React, { useState } from "react";
import {
  FileText,
  UploadCloud,
  Layers,
  Database,
  Search,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  FileCheck2
} from "lucide-react";

interface KnowledgeDoc {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  totalChunks: number;
  status: "indexed" | "processing";
  description: string;
}

interface ChunkItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export default function Knowledge() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDoc | null>(null);
  const [isChunkModalOpen, setIsChunkModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Danh sách tài liệu hiện có trong hệ thống (Gắn đúng file admission-2026.pdf)
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([
    {
      id: "doc-1",
      fileName: "admission-2026.pdf",
      fileSize: "2.4 MB",
      uploadDate: "2026-09-18",
      totalChunks: 148,
      status: "indexed",
      description: "Đề án tuyển sinh trình độ đại học chính quy năm 2026 - TT University",
    },
    {
      id: "doc-2",
      fileName: "quy-che-tuyen-sinh-va-hoc-phi-2026.pdf",
      fileSize: "1.8 MB",
      uploadDate: "2026-09-22",
      totalChunks: 96,
      status: "indexed",
      description: "Quy định mức thu học phí và chính sách học bổng đầu vào năm học 2026 - 2027",
    },
  ]);

  // Dữ liệu mẫu các đoạn trích kiến thức (Knowledge Chunks) được bóc tách từ file admission-2026.pdf
  const [chunks] = useState<ChunkItem[]>([
    {
      id: "chk-1",
      title: "Chỉ tiêu tuyển sinh và Mã ngành 2026",
      content:
        "Năm 2026, Trường tuyển sinh 2.500 chỉ tiêu hệ đại học chính quy trên toàn quốc. Ngành Công nghệ thông tin (Mã ngành: 7480201) tuyển 450 chỉ tiêu, xét tuyển các tổ hợp A00 (Toán, Lý, Hóa), A01 (Toán, Lý, Anh), D01 (Toán, Văn, Anh).",
      tags: ["Chỉ tiêu", "CNTT", "Tổ hợp môn"],
    },
    {
      id: "chk-2",
      title: "Phương thức xét tuyển học bạ THPT",
      content:
        "Phương thức 2: Xét kết quả học tập THPT (học bạ). Điều kiện nộp hồ sơ: Tổng điểm trung bình 3 môn trong tổ hợp xét tuyển của cả năm lớp 12 đạt từ 18.0 điểm trở lên. Thời gian nhận hồ sơ đợt 1 từ ngày 01/04/2026 đến 30/06/2026.",
      tags: ["Học bạ", "Xét tuyển", "Thời gian"],
    },
    {
      id: "chk-3",
      title: "Mức học phí và lộ trình đóng học phí",
      content:
        "Học phí khối ngành Kỹ thuật và Công nghệ dự kiến: 550.000đ/tín chỉ (khoảng 18.000.000đ - 21.000.000đ/học kỳ). Cam kết mức tăng học phí hằng năm không vượt quá 10% theo quy định của Bộ Giáo dục & Đào tạo.",
      tags: ["Học phí", "Kỹ thuật", "Tín chỉ"],
    },
    {
      id: "chk-4",
      title: "Chính sách Học bổng Tân sinh viên",
      content:
        "Học bổng Thủ khoa đầu vào: Miễn 100% học phí toàn khóa học. Học bổng Khuyến khích tài năng: Thí sinh đạt từ 26.0 điểm thi tốt nghiệp THPT hoặc IELTS từ 6.5 trở lên được giảm 50% học phí năm học đầu tiên.",
      tags: ["Học bổng", "IELTS", "Thủ khoa"],
    },
  ]);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc: KnowledgeDoc = {
        id: `doc-${Date.now()}`,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
        totalChunks: Math.floor(Math.random() * 50) + 30,
        status: "indexed",
        description: "Tài liệu bổ sung cho cơ sở tri thức tư vấn tuyển sinh",
      };
      setDocuments([newDoc, ...documents]);
      setIsUploading(false);
    }, 1500);
  };

  const handleDeleteDocument = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa tài liệu này khỏi cơ sở tri thức của AI?")) {
      setDocuments(documents.filter((d) => d.id !== id));
    }
  };

  const openChunkModal = (doc: KnowledgeDoc) => {
    setSelectedDoc(doc);
    setIsChunkModalOpen(true);
  };

  const filteredDocs = documents.filter(
    (d) =>
      d.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* Tiêu đề */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quản lý Tri thức Tuyển sinh (Knowledge Base)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Nạp tài liệu PDF tuyển sinh 2026 để huấn luyện và cấp dữ liệu cho Chatbot AI trả lời thí sinh.
          </p>
        </div>

        <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-sm transition shadow-blue-200 cursor-pointer">
          <UploadCloud size={18} />
          <span>Tải lên tài liệu PDF</span>
          <input
            type="file"
            accept=".pdf"
            onChange={handleUploadFile}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {/* 3 Thẻ thống kê KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tài liệu tuyển sinh (PDF)
            </p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{documents.length} File</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Số đoạn trích kiến thức (Chunks)
            </p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {documents.reduce((acc, curr) => acc + curr.totalChunks, 0)} Chunks
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Trạng thái Vector Database
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
              <CheckCircle2 size={20} /> Đã sẵn sàng
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Database size={24} />
          </div>
        </div>
      </div>

      {/* Trạng thái đang tải lên */}
      {isUploading && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 text-blue-700 animate-pulse">
          <Clock size={20} className="animate-spin" />
          <span className="text-sm font-medium">
            Đang phân tích file PDF, trích xuất văn bản (pdf-parse) và lập chỉ mục Vector...
          </span>
        </div>
      )}

      {/* Danh sách tài liệu */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Thanh tìm kiếm */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm tài liệu tuyển sinh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Bảng Table tài liệu */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Tài liệu nạp</th>
                <th className="py-4 px-6">Dung lượng</th>
                <th className="py-4 px-6">Số Chunks</th>
                <th className="py-4 px-6">Trạng thái lập chỉ mục</th>
                <th className="py-4 px-6">Ngày cập nhật</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-center flex-shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{doc.fileName}</p>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-sm">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-600 font-medium text-xs">
                      {doc.fileSize}
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                        <Layers size={13} /> {doc.totalChunks} Chunks
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Đã sẵn sàng cho AI
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-500 text-xs">
                      {doc.uploadDate}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openChunkModal(doc)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Xem các đoạn trích kiến thức"
                        >
                          <Eye size={15} />
                          <span>Xem Chunks</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Xóa tài liệu"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Không tìm thấy tài liệu phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL XEM CHI TIẾT CÁC ĐOẠN TRÍCH (CHUNKS) ================= */}
      {isChunkModalOpen && selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <FileCheck2 size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{selectedDoc.fileName}</h3>
                  <p className="text-xs text-slate-400">
                    Hiển thị các khối kiến thức đã bóc tách phục vụ Chatbot AI
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChunkModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Danh sách Chunks */}
            <div className="p-5 space-y-3.5 overflow-y-auto flex-1 bg-slate-50/30">
              {chunks.map((chk, index) => (
                <div
                  key={chk.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 hover:border-blue-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                      <Sparkles size={14} /> Chunk #{index + 1}: {chk.title}
                    </span>
                    <div className="flex gap-1.5">
                      {chk.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-lg border border-slate-100">
                    "{chk.content}"
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
              <button
                type="button"
                onClick={() => setIsChunkModalOpen(false)}
                className="px-5 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-medium hover:bg-slate-200 transition"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}