import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import useSessionTimeout from "../hooks/useSessionTimeout";

export default function AdminLayout() {
  useSessionTimeout();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}