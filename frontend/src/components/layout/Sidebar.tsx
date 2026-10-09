import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  MessageSquareText,
  BarChart3,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Nhóm menu theo từng khối nghiệp vụ
  const navigationGroups = [
    {
      group: "TỔNG QUAN",
      items: [
        {
          label: "Tổng quan",
          path: "/admindashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Thống kê tuyển sinh",
          path: "/admindashboard/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      group: "AI & TUYỂN SINH",
      items: [
        {
          label: "Lịch sử chat AI",
          path: "/admindashboard/conversations",
          icon: MessageSquareText,
          badge: "Mới",
        },
        {
          label: "Tài liệu (Knowledge)",
          path: "/admin/knowledge",
          icon: BookOpen,
        },
        {
          label: "Thí sinh tiềm năng",
          path: "/admindashboard/leads",
          icon: UserCheck,
        },
      ],
    },
    {
      group: "QUẢN TRỊ",
      items: [
        {
          label: "Người dùng & Nhân sự",
          path: "/admin/users",
          icon: Users,
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm">
      {/* =========================
          LOGO & BRAND
      ========================= */}
      <div className="flex h-16 items-center border-b border-slate-100 px-5">
        <button
          onClick={() => navigate("/admindashboard")}
          className="flex items-center gap-3 text-left transition hover:opacity-85"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-200">
            TT
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 tracking-tight">
              TT University
            </p>
            <p className="text-xs font-medium text-slate-400">
              Admin Portal
            </p>
          </div>
        </button>
      </div>

      {/* =========================
          NAVIGATION MENU
      ========================= */}
      <nav className="flex-1 space-y-6 overflow-y-auto p-4 custom-scrollbar">
        {navigationGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            <p className="px-3 text-[11px] font-semibold text-slate-400 tracking-wider">
              {group.group}
            </p>

            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-300"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2 : 1.75}
                      className={
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-blue-600"
                      }
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* =========================
          ADMIN PROFILE & LOGOUT
      ========================= */}
      <div className="border-t border-slate-100 p-4 space-y-2">
        {/* Profile Card Thu nhỏ */}
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <ShieldCheck size={18} className="text-blue-600" />
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-xs font-bold text-slate-800">
              Quản trị viên
            </p>
            <p className="truncate text-[11px] text-slate-400">
              admin@ttuniversity.edu.vn
            </p>
          </div>
        </div>

        {/* Nút Đăng xuất */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}