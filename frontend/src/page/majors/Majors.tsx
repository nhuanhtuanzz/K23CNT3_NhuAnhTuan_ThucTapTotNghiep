import { useNavigate } from "react-router-dom";

const majors = [
  {
    code: "7480201",
    name: "Công nghệ thông tin",
    description:
      "Đào tạo kiến thức và kỹ năng về công nghệ thông tin, phát triển phần mềm và các hệ thống thông tin.",
  },
  {
    code: "7480103",
    name: "Kỹ thuật phần mềm",
    description:
      "Tập trung vào quy trình phát triển, thiết kế, xây dựng và quản lý các sản phẩm phần mềm.",
  },
  {
    code: "7480107",
    name: "Trí tuệ nhân tạo",
    description:
      "Tập trung vào các kiến thức và kỹ thuật liên quan đến trí tuệ nhân tạo, dữ liệu và các hệ thống thông minh.",
  },
  {
    code: "7340101",
    name: "Quản trị kinh doanh",
    description:
      "Cung cấp kiến thức về quản trị, kinh doanh, marketing và các hoạt động của doanh nghiệp.",
  },
  {
    code: "7520201",
    name: "Kỹ thuật điện",
    description:
      "Đào tạo kiến thức về kỹ thuật điện và các hệ thống, thiết bị điện.",
  },
];

export default function Majors() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================
          HERO
      ========================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Chương trình đào tạo
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Ngành đào tạo
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Khám phá các ngành đào tạo và tìm hiểu thông tin
            về chương trình học tại TT University.
          </p>
        </div>
      </section>

      {/* =========================
          MAJOR LIST
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {majors.map((major) => (
            <div
              key={major.code}
              className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Code */}
              <p className="text-sm font-semibold text-blue-600">
                Mã ngành {major.code}
              </p>

              {/* Name */}
              <h2 className="mt-3 text-xl font-bold leading-7 text-slate-900">
                {major.name}
              </h2>

              {/* Description */}
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                {major.description}
              </p>

              {/* Button */}
              <button
                onClick={() =>
                  navigate(`/majors/${major.code}`)
                }
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}