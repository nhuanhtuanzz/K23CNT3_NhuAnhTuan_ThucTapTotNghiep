import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-blue-700 bg-blue-600 text-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-left"
        >
          <p className="text-lg font-bold text-white">
            TT University
          </p>

          <p className="text-xs text-blue-100">
            Cổng thông tin tuyển sinh
          </p>
        </button>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-white transition hover:text-blue-100"
          >
            Trang chủ
          </button>

          <button
            onClick={() => navigate("/majors")}
            className="text-sm font-medium text-white transition hover:text-blue-100"
          >
            Ngành đào tạo
          </button>

          <button
            onClick={() => navigate("/admissions")}
            className="text-sm font-medium text-white transition hover:text-blue-100"
          >
            Tuyển sinh
          </button>
        </nav>

      </div>
    </header>
  );
}