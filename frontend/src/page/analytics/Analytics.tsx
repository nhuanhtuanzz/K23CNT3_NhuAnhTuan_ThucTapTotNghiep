import { useState } from "react";
import {
  TrendingUp,
  Users,
  Award,
  Calendar,
  ArrowUpRight,
  PieChart,
  BarChart3,
  Bot
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("month");

  // Dữ liệu thống kê mức độ quan tâm theo ngành học năm 2026
  const majorStats = [
    { name: "Công nghệ thông tin", leads: 420, percent: 35 },
    { name: "Thiết kế đồ họa", leads: 264, percent: 22 },
    { name: "Quản trị kinh doanh", leads: 216, percent: 18 },
    { name: "Ngôn ngữ Anh", leads: 180, percent: 15 },
    { name: "Khác", leads: 120, percent: 10 },
  ];

  // Thống kê các chủ đề Chatbot AI nhận được nhiều câu hỏi nhất
  const topQuestions = [
    { topic: "Học phí và lộ trình đóng", count: 1240, share: "42%" },
    { topic: "Điều kiện xét học bạ THPT", count: 980, share: "33%" },
    { topic: "Chỉ tiêu và điểm chuẩn các năm", count: 450, share: "15%" },
    { topic: "Ký túc xá và học bổng tân sinh viên", count: 295, share: "10%" },
  ];

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Thống kê & Phân tích Tuyển sinh 2026
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Báo cáo tổng hợp số liệu thí sinh, hiệu suất Chatbot AI và xu hướng quan tâm ngành học.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 shadow-sm">
            <Calendar size={15} className="text-slate-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="week">7 ngày qua</option>
              <option value="month">Tháng 9/2026</option>
              <option value="year">Cả đợt tuyển sinh 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= 4 KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Lượt tư vấn AI
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bot size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-800">2,965</h3>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 mt-1">
              <ArrowUpRight size={14} /> +18.4% so với tháng trước
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Hồ sơ tiềm năng (Leads)
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-800">1,200</h3>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 mt-1">
              <ArrowUpRight size={14} /> +12.1% tỷ lệ thu thập SĐT
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tỷ lệ giải đáp tự động
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-800">92.6%</h3>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 mt-1">
              <ArrowUpRight size={14} /> Dựa trên file admission-2026.pdf
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Chuyển đổi đăng ký xét tuyển
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award size={20} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-slate-800">38.2%</h3>
            <span className="inline-flex items-center text-xs font-semibold text-slate-500 mt-1">
              458 thí sinh nộp học bạ
            </span>
          </div>
        </div>
      </div>

      {/* ================= 2 CỘT BIỂU ĐỒ & BÁO CÁO ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CỘT TRÁI: XU HƯỚNG QUAN TÂM NGÀNH NGHỀ */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={20} />
              <h3 className="font-bold text-slate-800 text-base">
                Tỷ lệ quan tâm theo Ngành đào tạo
              </h3>
            </div>
            <span className="text-xs text-slate-400">Dữ liệu hỏi đáp 2026</span>
          </div>

          <div className="space-y-4 pt-2">
            {majorStats.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{item.leads} lượt</span>
                    <span className="font-bold text-slate-800">{item.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: TOP CHỦ ĐỀ THÍ SINH QUAN TÂM */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="text-purple-600" size={20} />
              <h3 className="font-bold text-slate-800 text-base">
                Chủ đề câu hỏi phổ biến
              </h3>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {topQuestions.map((q, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{q.topic}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{q.count} lượt hỏi</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                  {q.share}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-700 leading-relaxed">
            💡 <strong>Khuyến nghị:</strong> Có hơn 40% câu hỏi tập trung vào Học phí. Nên đưa nội dung học phí lên vị trí nổi bật tại trang chủ để thí sinh tra cứu tức thì.
          </div>
        </div>
      </div>
    </div>
  );
}