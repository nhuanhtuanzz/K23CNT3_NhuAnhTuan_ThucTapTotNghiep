import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import loginImage from "../../assets/login-campus.jpg";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/signin", {
        email: email.trim(),
        password,
      });

      const data = response.data.data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
        "Email hoặc mật khẩu không chính xác."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT - IMAGE
        ====================================================== */}
        <section
          className="relative hidden min-h-screen overflow-hidden bg-cover bg-center lg:block"
          style={{
            backgroundImage: `url(${loginImage})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-950/45" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-12 xl:p-16">

            {/* Brand */}
            <div>
              <p className="text-lg font-semibold tracking-tight text-white">
                TT University
              </p>

              <p className="mt-1 text-sm text-white/70">
                Hệ thống tuyển sinh
              </p>
            </div>

            {/* Main content */}
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                Admissions AI
              </p>

              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white xl:text-5xl">
                Quản lý tuyển sinh
                <br />
                thông minh với AI
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/80">
                Hệ thống quản trị thông tin tuyển sinh,
                dữ liệu kiến thức và hỗ trợ tư vấn thí sinh
                bằng trí tuệ nhân tạo.
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>© 2026 TT University</span>
              <span>Admin Portal</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT - LOGIN FORM
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">

            {/* Mobile brand */}
            <div className="mb-10 lg:hidden">
              <p className="text-lg font-semibold tracking-tight text-slate-900">
                TT University
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Hệ thống tuyển sinh
              </p>
            </div>

            {/* Heading */}
            <div>
              <p className="text-sm font-semibold tracking-wide text-blue-600">
                ADMIN PORTAL
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Chào mừng trở lại
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Đăng nhập để tiếp tục quản lý hệ thống tuyển sinh.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm leading-5 text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Mật khẩu
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  {/* Eye button */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    title={
                      showPassword
                        ? "Ẩn mật khẩu"
                        : "Hiện mật khẩu"
                    }
                  >
                    {showPassword ? (
                      /* Eye off */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.58 10.58a2 2 0 102.83 2.83"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.88 4.24A9.77 9.77 0 0112 4c5 0 8.5 4 9.5 8a10.8 10.8 0 01-2.03 3.86"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.23 6.23C4.5 7.45 3.33 9.2 2.5 12c1 4 4.5 8 9.5 8 1.61 0 3.07-.4 4.35-1.05"
                        />
                      </svg>
                    ) : (
                      /* Eye */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                        />

                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </button>
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </form>

            {/* Back */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                Về trang tuyển sinh
              </button>
            </div>

            {/* Security note */}
            <div className="mt-10 text-center text-xs text-slate-400">
              Thông tin đăng nhập được bảo mật
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
