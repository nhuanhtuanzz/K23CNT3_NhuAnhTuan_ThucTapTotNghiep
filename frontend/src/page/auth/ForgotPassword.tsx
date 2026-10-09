import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      setSent(true);
    } catch (error: any) {
      console.error("Forgot password error:", error);

      setError(
        error.response?.data?.message ||
          "Có lỗi xảy ra. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/forgot-password", {
        email: email.trim(),
      });
    } catch (error: any) {
      console.error("Resend reset email error:", error);

      setError(
        error.response?.data?.message ||
          "Không thể gửi lại email. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl">
              ✉️
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Kiểm tra email của bạn
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu
              đến email của bạn.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Nếu chưa thấy email, hãy kiểm tra thư rác
              hoặc yêu cầu gửi lại.
            </p>

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Đang gửi..."
                : "Gửi lại email"}
            </button>

            <div className="mt-5">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                ← Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              🔐
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Quên mật khẩu?
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Nhập email của bạn để đặt lại mật khẩu.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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
                disabled={loading}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Đang gửi..."
                : "Gửi "}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}