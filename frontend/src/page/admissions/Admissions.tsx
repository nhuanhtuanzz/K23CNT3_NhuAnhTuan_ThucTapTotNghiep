import { useNavigate } from "react-router-dom";

interface AdmissionMethod {
  number: string;
  title: string;
  description: string;
}

interface SubjectCombination {
  code: string;
  subjects: string;
}

interface NoticeItem {
  title: string;
  description: string;
}

const admissionMethods: AdmissionMethod[] = [
  {
    number: "01",
    title: "Xét tuyển theo kết quả thi tốt nghiệp THPT",
    description:
      "Thí sinh sử dụng kết quả kỳ thi tốt nghiệp THPT để đăng ký xét tuyển vào ngành đào tạo theo quy định tuyển sinh.",
  },
  {
    number: "02",
    title: "Xét tuyển theo học bạ",
    description:
      "Thí sinh sử dụng kết quả học tập THPT theo điều kiện và tiêu chí xét tuyển được công bố trong thông tin tuyển sinh.",
  },
  {
    number: "03",
    title: "Xét tuyển thẳng",
    description:
      "Thực hiện xét tuyển đối với các đối tượng đủ điều kiện theo quy định tuyển sinh hiện hành của nhà trường.",
  },
];

const subjectCombinations: SubjectCombination[] = [
  {
    code: "A00",
    subjects: "Toán · Vật lý · Hóa học",
  },
  {
    code: "A01",
    subjects: "Toán · Vật lý · Tiếng Anh",
  },
  {
    code: "D01",
    subjects: "Toán · Ngữ văn · Tiếng Anh",
  },
];

const notices: NoticeItem[] = [
  {
    title: "Thông tin hồ sơ",
    description:
      "Thí sinh chuẩn bị thông tin cá nhân, thông tin học tập và các giấy tờ liên quan theo phương thức xét tuyển.",
  },
  {
    title: "Kiểm tra điều kiện",
    description:
      "Thí sinh cần kiểm tra điều kiện xét tuyển tương ứng với phương thức đăng ký trước khi nộp hồ sơ.",
  },
  {
    title: "Theo dõi thông báo",
    description:
      "Thí sinh cần thường xuyên theo dõi thông báo tuyển sinh chính thức để cập nhật thời gian và yêu cầu hồ sơ.",
  },
];

export default function Admissions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-700 text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm">
              Tuyển sinh đại học 2026
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Thông tin tuyển sinh
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
              Tìm hiểu thông tin về phương thức xét tuyển,
              tổ hợp xét tuyển, học phí, hồ sơ và các nội dung
              cần lưu ý khi đăng ký tuyển sinh tại TT University.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* =================================================
            OVERVIEW CARDS
        ================================================= */}
        <section className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🎓
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Ngành đào tạo
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Khám phá danh sách ngành đào tạo và thông tin
              chi tiết của từng ngành.
            </p>

            <button
              onClick={() => navigate("/majors")}
              className="mt-5 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
            >
              Xem ngành đào tạo →
            </button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              📝
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Phương thức xét tuyển
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tìm hiểu các phương thức xét tuyển được áp dụng
              trong mùa tuyển sinh.
            </p>

            <a
              href="#phuong-thuc"
              className="mt-5 inline-block text-sm font-semibold text-blue-600 transition hover:text-blue-800"
            >
              Xem chi tiết →
            </a>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🤖
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Hỏi trợ lý AI
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Đặt câu hỏi về ngành học và thông tin tuyển sinh
              với trợ lý AI.
            </p>

            <button
              onClick={() => {
                window.dispatchEvent(
                  new Event("open-ai-chat")
                );
              }}
              className="mt-5 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
            >
              Hỏi AI →
            </button>
          </div>
        </section>

        {/* =================================================
            PHƯƠNG THỨC XÉT TUYỂN
        ================================================= */}
        <section
          id="phuong-thuc"
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              01
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Phương thức xét tuyển
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Thông tin về các phương thức xét tuyển giúp thí
              sinh lựa chọn hình thức đăng ký phù hợp với hồ sơ
              của mình.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {admissionMethods.map((method) => (
              <div
                key={method.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                  {method.number}
                </div>

                <h3 className="mt-5 text-lg font-bold leading-7 text-slate-900">
                  {method.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            TỔ HỢP XÉT TUYỂN
        ================================================= */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              02
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Tổ hợp xét tuyển
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Các tổ hợp môn được sử dụng trong xét tuyển được
              trình bày để thí sinh thuận tiện theo dõi.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {subjectCombinations.map((combination) => (
              <div
                key={combination.code}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <p className="text-3xl font-bold text-blue-600">
                  {combination.code}
                </p>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="text-sm leading-6 text-slate-600">
                    {combination.subjects}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            HỌC PHÍ
        ================================================= */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                03
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Học phí
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Học phí được thực hiện theo chính sách học phí
                của chương trình đào tạo và từng năm học.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                Thí sinh nên theo dõi thông báo chính thức của
                nhà trường để cập nhật mức học phí áp dụng cho
                năm tuyển sinh.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100">
              <p className="text-sm font-medium text-blue-700">
                Lưu ý
              </p>

              <p className="mt-2 text-sm leading-6 text-blue-900">
                Mức học phí có thể được cập nhật theo chương
                trình đào tạo và chính sách của nhà trường.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            HỒ SƠ
        ================================================= */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              04
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Hồ sơ và lưu ý
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Thí sinh cần chuẩn bị đầy đủ thông tin và giấy tờ
              theo phương thức xét tuyển đã lựa chọn.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {notices.map((notice, index) => (
              <div
                key={notice.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {notice.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {notice.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            NGÀNH ĐÀO TẠO
        ================================================= */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 ring-1 ring-blue-100 md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Khám phá chương trình đào tạo
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Tìm ngành học phù hợp với bạn
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                Xem danh sách ngành đào tạo, mã ngành và thông
                tin chi tiết của từng ngành.
              </p>
            </div>

            <button
              onClick={() => navigate("/majors")}
              className="shrink-0 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Xem ngành đào tạo →
            </button>
          </div>
        </section>

        {/* =================================================
            AI CTA
        ================================================= */}
        <section className="mt-8 rounded-2xl bg-slate-900 p-6 text-white shadow-sm md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl">
                  🤖
                </div>

                <div>
                  <p className="font-semibold">
                    Trợ lý AI tuyển sinh
                  </p>

                  <p className="text-sm text-slate-400">
                    Hỗ trợ giải đáp thông tin tuyển sinh
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                Bạn chưa tìm thấy thông tin mình cần? Hãy đặt
                câu hỏi trực tiếp với trợ lý AI.
              </p>
            </div>

            <button
              onClick={() => {
                window.dispatchEvent(
                  new Event("open-ai-chat")
                );
              }}
              className="shrink-0 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              🤖 Hỏi AI ngay
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}