import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const accessToken = localStorage.getItem("accessToken");
  const userString = localStorage.getItem("user");

  // Chưa đăng nhập
  if (!accessToken || !userString) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(userString);
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");

    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập nhưng không phải admin
  if (user.role !== "admin") {
    return <Navigate to="/chat" replace />;
  }

  // Là admin
  return <Outlet />;
}