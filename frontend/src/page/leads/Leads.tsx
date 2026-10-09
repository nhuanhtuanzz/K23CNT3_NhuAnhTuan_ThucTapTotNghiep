import { useState } from "react";
import {
  UserCheck,
  Search,
  Filter,
  Phone,
  Mail,
  GraduationCap,
  CheckCircle2,
  Clock,
  PhoneCall,
  Trash2,
  FileSpreadsheet
} from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  majorInterested: string;
  status: "new" | "contacted" | "enrolled";
  createdAt: string;
  notes: string;
}

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [leads, setLeads] = useState<LeadItem[]>([
    {
      id: "1",
      name: "Trần Bảo Nam",
      phone: "0912 345 889",
      email: "baonam.tran@gmail.com",
      majorInterested: "Công nghệ thông tin",
      status: "new",
      createdAt: "2026-09-29 09:40",
      notes: "Quan tâm xét tuyển học bạ đợt 1 và học phí chương trình tài năng.",
    },
    {
      id: "2",
      name: "Lê Hoàng Yến",
      phone: "0988 776 554",
      email: "hoangyen.le@gmail.com",
      majorInterested: "Thiết kế đồ họa",
      status: "contacted",
      createdAt: "2026-09-28 15:20",
      notes: "Đã gọi điện tư vấn học phí và khu ký túc xá cho tân sinh viên.",
    },
    {
      id: "3",
      name: "Nguyễn Minh Đức",
      phone: "0904 123 998",
      email: "duc.nm@gmail.com",
      majorInterested: "Quản trị kinh doanh",
      status: "enrolled",
      createdAt: "2026-09-27 11:05",
      notes: "Đã nộp hồ sơ xét tuyển học bạ trực tuyến.",
    },
    {
      id: "4",
      name: "Phạm Thu Thảo",
      phone: "0971 889 002",
      email: "thuthao.pham@gmail.com",
      majorInterested: "Ngôn ngữ Anh",
      status: "new",
      createdAt: "2026-09-26 16:45",
      notes: "Hỏi về chứng chỉ IELTS 6.5 được miễn học phần tiếng Anh cơ bản.",
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: "new" | "contacted" | "enrolled") => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hồ sơ thí sinh này?")) {
      setLeads(leads.filter((l) => l.id !== id));
    }
  };

  const handleExportCSV = () => {
    const headers = "Họ tên,Số điện thoại,Email,Ngành quan tâm,Trạng thái,Thời gian\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.name}","${l.phone}","${l.email}","${l.majorInterested}","${l.status}","${l.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "danh-sach-thi-sinh-2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.majorInterested.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quản lý Thí sinh tiềm năng (Leads)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Dữ liệu thí sinh để lại thông tin liên hệ qua Chatbot AI để phòng tuyển sinh tư vấn.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-sm transition shadow-emerald-200"
        >
          <FileSpreadsheet size={18} />
          <span>Xuất danh sách Excel / CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tổng số thí sinh liên hệ
            </p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{leads.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Cần liên hệ tư vấn
            </p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">
              {leads.filter((l) => l.status === "new").length}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Đã hoàn tất nộp hồ sơ
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">
              {leads.filter((l) => l.status === "enrolled").length}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT hoặc ngành học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter size={18} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="new">Mới - Chưa gọi</option>
              <option value="contacted">Đã liên hệ tư vấn</option>
              <option value="enrolled">Đã nộp hồ sơ</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-100">
                <th className="py-4 px-6">Thí sinh</th>
                <th className="py-4 px-6">Thông tin liên hệ</th>
                <th className="py-4 px-6">Ngành quan tâm</th>
                <th className="py-4 px-6">Trạng thái tư vấn</th>
                <th className="py-4 px-6">Thời gian gửi</th>
                <th className="py-4 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-sm uppercase">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{lead.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-xs">
                            {lead.notes}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Phone size={13} className="text-blue-600" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail size={13} />
                        <span>{lead.email}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        <GraduationCap size={14} />
                        {lead.majorInterested}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleUpdateStatus(lead.id, e.target.value as "new" | "contacted" | "enrolled")
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          lead.status === "new"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : lead.status === "contacted"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        <option value="new">Mới - Chưa gọi</option>
                        <option value="contacted">Đã liên hệ</option>
                        <option value="enrolled">Đã nộp hồ sơ</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-slate-500 text-xs">
                      {lead.createdAt}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                          title="Gọi điện ngay"
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        >
                          <PhoneCall size={16} />
                        </a>
                        <button
                          type="button"
                          title="Xóa hồ sơ"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
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
                    Không tìm thấy hồ sơ thí sinh nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}