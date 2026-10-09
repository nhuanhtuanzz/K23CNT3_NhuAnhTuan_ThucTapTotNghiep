import { useNavigate, useParams } from "react-router-dom";

interface Major {
  code: string;
  name: string;
  shortName: string;
  description: string;
  subjects: string[];
}

const majors: Major[] = [
  {
    code: "7480201",
    name: "Công nghệ thông tin",
    shortName: "CNTT",
    description:
      "Đào tạo kiến thức và kỹ năng về công nghệ thông tin, phát triển phần mềm và các hệ thống thông tin.",
    subjects: [
      "Lập trình",
      "Cơ sở dữ liệu",
      "Mạng máy tính",
      "Phát triển phần mềm",
      "Hệ thống thông tin",
    ],
  },
  {
    code: "7480103",
    name: "Kỹ thuật phần mềm",
    shortName: "KT phần mềm",
    description:
      "Tập trung vào quy trình phân tích, thiết kế, xây dựng, kiểm thử và quản lý các sản phẩm phần mềm.",
    subjects: [
      "Phân tích yêu cầu",
      "Thiết kế phần mềm",
      "Lập trình",
      "Kiểm thử phần mềm",
      "Quản lý dự án phần mềm",
    ],
  },
  {
    code: "7480107",
    name: "Trí tuệ nhân tạo",
    shortName: "AI",
    description:
      "Tập trung vào các kiến thức và kỹ thuật liên quan đến trí tuệ nhân tạo, dữ liệu và các hệ thống thông minh.",
    subjects: [
      "Trí tuệ nhân tạo",
      "Machine Learning",
      "Xử lý dữ liệu",
      "Thị giác máy tính",
      "Xử lý ngôn ngữ tự nhiên",
    ],
  },
  {
    code: "7340101",
    name: "Quản trị kinh doanh",
    shortName: "QTKD",
    description:
      "Cung cấp kiến thức về quản trị, kinh doanh, marketing và các hoạt động của doanh nghiệp.",
    subjects: [
      "Quản trị doanh nghiệp",
      "Marketing",
      "Tài chính doanh nghiệp",
      "Quản trị nhân sự",
      "Chiến lược kinh doanh",
    ],
  },
  {
    code: "7520201",
    name: "Kỹ thuật điện",
    shortName: "KTĐ",
    description:
      "Đào tạo kiến thức về kỹ thuật điện và các hệ thống, thiết bị điện.",
    subjects: [
      "Mạch điện",
      "Kỹ thuật điện",
      "Điện tử cơ bản",
      "Hệ thống điện",
      "Thiết bị điện",
    ],
  },
];

export default function MajorDetail() {
  const navigate = useNavigate();
  const { code } = useParams();

  const major = majors.find(
    (item) => item.code === code
  );

  if (!major) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Không tìm thấy ngành học
          </h1>

          <p className="mt-3 text-slate-500">
            Mã ngành không tồn tại trong hệ thống.
          </p>

          <button
            onClick={() => navigate("/majors")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Quay lại ngành đào tạo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================
          HERO
      ========================= */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <button
            onClick={() => navigate("/majors")}
            className="mb-8 text-sm font-medium text-blue-100 transition hover:text-white"
          >
            ← Quay lại ngành đào tạo
          </button>

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
            {major.shortName}
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            {major.name}
          </h1>

          <p className="mt-4 text-blue-100">
            Mã ngành:{" "}
            <span className="font-semibold text-white">
              {major.code}
            </span>
          </p>
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Giới thiệu ngành
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {major.description}
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Một số nội dung đào tạo
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {major.subjects.map((subject) => (
                  <div
                    key={subject}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-sm font-medium text-slate-700">
                      {subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">
                Mã ngành
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {major.code}
              </p>

              <div className="my-6 border-t border-slate-200" />

              <p className="text-sm font-medium text-slate-500">
                Ngành
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {major.name}
              </p>

              <button
                onClick={() => {
                  window.dispatchEvent(
                    new Event("open-ai-chat")
                  );
                }}
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Hỏi AI về ngành này
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
              <p className="font-semibold text-blue-900">
                Cần tư vấn?
              </p>

              <p className="mt-2 text-sm leading-6 text-blue-700">
                Bạn có thể sử dụng trợ lý AI để tìm hiểu thêm
                về ngành học và thông tin tuyển sinh.
              </p>

              <button
                onClick={() => navigate("/chat")}
                className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Mở trợ lý AI →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}