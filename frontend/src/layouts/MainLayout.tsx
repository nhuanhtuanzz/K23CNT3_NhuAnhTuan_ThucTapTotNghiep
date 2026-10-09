import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import ChatWidget from "../components/chat/ChatWidget";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main>
        <Outlet />
      </main>

      <ChatWidget />
    </div>
  );
}