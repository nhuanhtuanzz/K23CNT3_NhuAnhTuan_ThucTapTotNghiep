import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../page/home/Home";
import Majors from "../page/majors/Majors";
import MajorDetail from "../page/majors/MajorDetail";
import Admissions from "../page/admissions/Admissions";

// Auth Pages
import Login from "../page/auth/Login";
import ForgotPassword from "../page/auth/ForgotPassword";
import ResetPassword from "../page/auth/ResetPassword";

// Admin Pages
import AdminDashboard from "../page/dashboard/AdminDashboard";
import UserManagement from "../page/users/index";
import Conversations from "../page/conversations/Conversations";
import Leads from "../page/leads/Leads";
import Knowledge from "../page/knowledge/Knowledge";
import Analytics from "../page/analytics/Analytics";

// Route Guard
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================================================
            1. AUTHENTICATION
        ================================================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* =================================================
            2. PUBLIC WEBSITE
        ================================================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/majors" element={<Majors />} />
          <Route path="/majors/:code" element={<MajorDetail />} />
          <Route path="/admissions" element={<Admissions />} />
        </Route>

        {/* =================================================
            3. ADMIN PORTAL
        ================================================= */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            {/* Dashboard */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<Navigate to="/admindashboard" replace />} />
            <Route path="/admin/dashboard" element={<Navigate to="/admindashboard" replace />} />

            {/* Thống kê tuyển sinh (Analytics) */}
            <Route path="/admindashboard/analytics" element={<Analytics />} />
            <Route path="/admin/analytics" element={<Analytics />} />

            {/* Lịch sử Chatbot AI */}
            <Route path="/admindashboard/conversations" element={<Conversations />} />
            <Route path="/admin/conversations" element={<Conversations />} />

            {/* Thí sinh tiềm năng (Leads) */}
            <Route path="/admindashboard/leads" element={<Leads />} />
            <Route path="/admin/leads" element={<Leads />} />

            {/* Quản lý tri thức (PDF) */}
            <Route path="/admin/knowledge" element={<Knowledge />} />
            <Route path="/admindashboard/knowledge" element={<Knowledge />} />

            {/* Quản trị Người dùng & Nhân sự */}
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admindashboard/users" element={<UserManagement />} />
          </Route>
        </Route>

        {/* =================================================
            4. CATCH-ALL
        ================================================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}