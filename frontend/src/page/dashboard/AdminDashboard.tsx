import { useEffect, useState } from "react";
import api from "../../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    const loadUserCount = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) return;

        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const users: User[] = response.data.data || [];
        setUserCount(users.length);
      } catch (error) {
        console.error("Load user count error:", error);
      }
    };

    loadUserCount();
  }, []);

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Tổng quan
            </h1>
            <p className="text-sm text-slate-500">
              Quản lý hệ thống tuyển sinh
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">
              Admin
            </p>
            <p className="text-xs text-slate-500">
              Quản trị viên
            </p>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="mb-8 rounded-2xl bg-slate-900 p-8 text-white">
          <p className="text-sm font-medium text-slate-300">
            TT University
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Chào mừng đến Admin Portal
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Quản lý dữ liệu tuyển sinh và tài khoản trong hệ thống.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <DashboardCard
            title="Knowledge"
            value="—"
            description="Tài liệu kiến thức tuyển sinh"
          />

          <DashboardCard
            title="Người dùng"
            value={userCount === null ? "—" : String(userCount)}
            description="Tài khoản trong hệ thống"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">
            Quản lý nhanh
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <QuickAction
              title="Knowledge"
              description="Thêm, thay đổi hoặc xóa tài liệu PDF tuyển sinh."
            />

            <QuickAction
              title="Người dùng"
              description="Tạo và quản lý tài khoản nhân sự."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
}

function DashboardCard({
  title,
  value,
  description,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
}

function QuickAction({
  title,
  description,
}: QuickActionProps) {
  return (
    <button className="rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </button>
  );
}
