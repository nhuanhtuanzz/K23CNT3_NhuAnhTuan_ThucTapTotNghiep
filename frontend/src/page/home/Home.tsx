import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/heros.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================
          HERO
      ========================= */}
      <section
        className="relative min-h-[520px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Lớp trắng: đậm bên trái -> mờ dần sang phải */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/95 via-slate-100/75 to-transparent" />

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Tuyển sinh đại học 2026
            </p>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Khám phá ngành học
              <br />
              <span className="text-blue-700">
                phù hợp với bạn
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Tìm hiểu thông tin ngành đào tạo, phương thức xét tuyển,
              học phí và nhận tư vấn từ trợ lý AI tuyển sinh.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/majors")}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
              >
                Xem ngành đào tạo
              </button>

              <button
                onClick={() => navigate("/admissions")}
                className="rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Thông tin tuyển sinh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          QUICK INFORMATION
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard
            icon="🎓"
            title="Ngành đào tạo"
            description="Khám phá các ngành học, mã ngành và thông tin chương trình đào tạo."
            onClick={() => navigate("/majors")}
          />

          <InfoCard
            icon="📝"
            title="Phương thức xét tuyển"
            description="Tìm hiểu các phương thức xét tuyển và hồ sơ cần chuẩn bị."
            onClick={() => navigate("/admissions")}
          />

          <InfoCard
            icon="💰"
            title="Học phí"
            description="Tra cứu thông tin học phí và các khoản chi phí liên quan."
            onClick={() => navigate("/admissions")}
          />
        </div>
      </section>

      {/* =========================
          AI SECTION
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                🤖
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                Cần tư vấn tuyển sinh?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Trợ lý AI có thể giúp bạn tìm hiểu về ngành học,
                phương thức xét tuyển, tổ hợp môn, học phí và các
                thông tin tuyển sinh.
              </p>

              <button
                onClick={() => navigate("/chat")}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Hỏi AI ngay
              </button>
            </div>

            <div className="flex items-center justify-center bg-slate-100 p-8 md:p-12">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    🤖
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Trợ lý tuyển sinh
                    </p>

                    <p className="text-sm text-green-600">
                      ● Đang hoạt động
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl rounded-tl-none bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                  Xin chào! 👋
                  <br />
                  Tôi có thể giúp bạn tìm hiểu thông tin tuyển sinh.
                  Bạn muốn biết về ngành nào?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

function InfoCard({
  icon,
  title,
  description,
  onClick,
}: InfoCardProps) {
  return (
    <button
      onClick={onClick}
      className="group rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 leading-6 text-slate-600">
        {description}
      </p>

      <p className="mt-4 font-medium text-blue-600 group-hover:text-blue-700">
        Xem thêm →
      </p>
    </button>
  );
}