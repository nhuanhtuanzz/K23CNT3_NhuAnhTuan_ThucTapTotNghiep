import { useEffect, useState } from "react";
import api from "../../services/api";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "sales",
    label: "Sales",
  },
  {
    value: "teacher",
    label: "Teacher",
  },
  {
    value: "manager",
    label: "Manager",
  },
  {
    value: "accountant",
    label: "Accountant",
  },
];

export default function User() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });

  // =========================================
  // Load users
  // =========================================

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Bạn chưa đăng nhập");
      }

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUsers(response.data.data || []);
    } catch (error: any) {
      console.error("Load users error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Không thể tải danh sách người dùng"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================================
  // Create user
  // =========================================

  const handleCreateUser = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      setError(
        "Vui lòng nhập đầy đủ thông tin."
      );

      return;
    }

    if (form.password.length < 8) {
      setError(
        "Mật khẩu phải có ít nhất 8 ký tự."
      );

      return;
    }

    try {
      setCreating(true);

      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Bạn chưa đăng nhập");
      }

      await api.post(
        "/users",
        {
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setMessage(
        "Tạo tài khoản thành công."
      );

      setForm({
        name: "",
        email: "",
        password: "",
        role: "sales",
      });

      setShowForm(false);

      await loadUsers();
    } catch (error: any) {
      console.error(
        "Create user error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Không thể tạo tài khoản"
      );
    } finally {
      setCreating(false);
    }
  };

  // =========================================
  // Delete user
  // =========================================

  const handleDeleteUser = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa tài khoản này không?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Bạn chưa đăng nhập");
      }

      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUsers((prev) =>
        prev.filter(
          (user) => user._id !== id
        )
      );

      setMessage("Đã xóa tài khoản.");
    } catch (error: any) {
      console.error(
        "Delete user error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Không thể xóa tài khoản"
      );
    }
  };

  // =========================================
  // Render
  // =========================================

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Người dùng
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Quản lý tài khoản trong hệ thống.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setError("");
            setMessage("");
          }}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {showForm
            ? "Đóng"
            : "Tạo tài khoản"}
        </button>
      </div>

      {/* Message */}

      {message && (
        <div className="mt-5 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Create form */}

      {showForm && (
        <form
          onSubmit={handleCreateUser}
          className="mt-6 rounded-xl border border-slate-200 bg-white p-6"
        >
          <h2 className="font-semibold text-slate-900">
            Tạo tài khoản mới
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Họ tên
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  setForm({
                    ...form,
                    name: event.target.value,
                  })
                }
                placeholder="Nguyễn Văn A"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    email: event.target.value,
                  })
                }
                placeholder="user@example.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Mật khẩu
              </label>

              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm({
                    ...form,
                    password: event.target.value,
                  })
                }
                placeholder="Tối thiểu 8 ký tự"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Vai trò
              </label>

              <select
                value={form.role}
                onChange={(event) =>
                  setForm({
                    ...form,
                    role: event.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-900"
              >
                {roles.map((role) => (
                  <option
                    key={role.value}
                    value={role.value}
                  >
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? "Đang tạo..."
                : "Tạo tài khoản"}
            </button>
          </div>
        </form>
      )}

      {/* User list */}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Danh sách tài khoản
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tổng số: {users.length} tài khoản
          </p>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Đang tải danh sách tài khoản...
          </div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            Chưa có tài khoản nào.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-900">
                    {user.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <span className="text-sm text-slate-500">
                    {user.role}
                  </span>

                  <button
                    onClick={() =>
                      handleDeleteUser(
                        user._id
                      )
                    }
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-red-300 hover:text-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}