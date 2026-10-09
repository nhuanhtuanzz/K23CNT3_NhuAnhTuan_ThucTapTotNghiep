require("dotenv").config();

const connectDB = require("../config/db");

const KnowledgeDocument = require("../models/knowledgeDocument.model");
const KnowledgeChunk = require("../models/knowledgeChunk.model");

const seedKnowledge = async () => {
  try {
    await connectDB();

    // Xóa knowledge cũ
    await KnowledgeChunk.deleteMany({});
    await KnowledgeDocument.deleteMany({});

    // =========================
    // 1. Tạo document
    // =========================

    const document = await KnowledgeDocument.create({
      title: "Thông tin tuyển sinh đại học năm 2026",
      source: "admission-2026-demo",
      type: "manual",
      description:
        "Dữ liệu tuyển sinh giả lập phục vụ đồ án chatbot tư vấn tuyển sinh.",
    });

    // =========================
    // 2. Knowledge chunks
    // =========================

    const chunks = [
      {
        content:
          "Trường tuyển sinh đại học chính quy năm 2026 với nhiều ngành đào tạo thuộc các lĩnh vực công nghệ thông tin, kinh tế, quản trị và kỹ thuật.",
        chunkIndex: 0,
      },

      {
        content:
          "Ngành Công nghệ thông tin có mã ngành 7480201. Chương trình đào tạo cung cấp kiến thức về lập trình, cơ sở dữ liệu, mạng máy tính, công nghệ phần mềm và trí tuệ nhân tạo.",
        chunkIndex: 1,
      },

      {
        content:
          "Ngành Kỹ thuật phần mềm có mã ngành 7480103. Sinh viên được đào tạo về quy trình phát triển phần mềm, phân tích thiết kế hệ thống, kiểm thử và quản lý dự án phần mềm.",
        chunkIndex: 2,
      },

      {
        content:
          "Ngành Trí tuệ nhân tạo có mã ngành 7480107. Nội dung đào tạo gồm học máy, xử lý dữ liệu, thị giác máy tính và các ứng dụng trí tuệ nhân tạo.",
        chunkIndex: 3,
      },

      {
        content:
          "Ngành Quản trị kinh doanh có mã ngành 7340101. Chương trình tập trung vào quản trị doanh nghiệp, marketing, tài chính, nhân sự và quản lý hoạt động kinh doanh.",
        chunkIndex: 4,
      },

      {
        content:
          "Các phương thức xét tuyển gồm xét điểm thi tốt nghiệp THPT, xét học bạ và xét tuyển thẳng theo quy định tuyển sinh của nhà trường.",
        chunkIndex: 5,
      },

      {
        content:
          "Đối với phương thức xét điểm thi tốt nghiệp THPT, thí sinh sử dụng kết quả kỳ thi tốt nghiệp THPT theo tổ hợp môn phù hợp với ngành đăng ký xét tuyển.",
        chunkIndex: 6,
      },

      {
        content:
          "Đối với phương thức xét học bạ, nhà trường sử dụng kết quả học tập THPT theo điều kiện và tiêu chí được công bố trong thông tin tuyển sinh từng năm.",
        chunkIndex: 7,
      },

      {
        content:
          "Các tổ hợp xét tuyển tham khảo cho nhóm ngành Công nghệ thông tin gồm A00, A01 và D01.",
        chunkIndex: 8,
      },

      {
        content:
          "Tổ hợp A00 gồm Toán, Vật lý và Hóa học. Tổ hợp A01 gồm Toán, Vật lý và Tiếng Anh. Tổ hợp D01 gồm Toán, Ngữ văn và Tiếng Anh.",
        chunkIndex: 9,
      },

      {
        content:
          "Học phí được tính dựa trên số tín chỉ sinh viên đăng ký trong từng học kỳ. Mức học phí cụ thể phụ thuộc vào chương trình đào tạo và chính sách học phí của từng năm.",
        chunkIndex: 10,
      },

      {
        content:
          "Sinh viên ngành Công nghệ thông tin có thể định hướng nghề nghiệp trong các lĩnh vực phát triển phần mềm, phát triển web, phát triển ứng dụng di động, khoa học dữ liệu, trí tuệ nhân tạo và an ninh mạng.",
        chunkIndex: 11,
      },

      {
        content:
          "Sinh viên ngành Kỹ thuật phần mềm có thể làm việc ở các vị trí như lập trình viên, kỹ sư phần mềm, kiểm thử phần mềm, phân tích nghiệp vụ và quản lý dự án.",
        chunkIndex: 12,
      },

      {
        content:
          "Sinh viên ngành Trí tuệ nhân tạo có thể làm việc trong các lĩnh vực học máy, khoa học dữ liệu, xử lý ngôn ngữ tự nhiên, thị giác máy tính và phát triển các ứng dụng AI.",
        chunkIndex: 13,
      },

      {
        content:
          "Hồ sơ đăng ký xét tuyển có thể bao gồm thông tin cá nhân, thông tin học tập và các giấy tờ liên quan đến phương thức xét tuyển. Thí sinh cần kiểm tra yêu cầu hồ sơ cụ thể theo từng phương thức.",
        chunkIndex: 14,
      },

      {
        content:
          "Thí sinh cần theo dõi thông báo tuyển sinh chính thức của nhà trường để cập nhật thời gian đăng ký, thời gian nộp hồ sơ, chỉ tiêu, học phí và các điều kiện xét tuyển.",
        chunkIndex: 15,
      },

      {
        content:
          "Nhà trường khuyến nghị thí sinh lựa chọn ngành học dựa trên năng lực học tập, sở thích cá nhân, định hướng nghề nghiệp và yêu cầu của ngành đào tạo.",
        chunkIndex: 16,
      },

      {
        content:
          "Thông tin về điểm chuẩn, chỉ tiêu tuyển sinh và mức học phí có thể thay đổi theo từng năm. Dữ liệu trong bộ knowledge demo này chỉ phục vụ mục đích minh họa cho hệ thống chatbot.",
        chunkIndex: 17,
      },
    ];

    // =========================
    // 3. Insert chunks
    // =========================

    await KnowledgeChunk.insertMany(
      chunks.map((chunk) => ({
        documentId: document._id,

        content: chunk.content,

        // Sẽ được tạo ở bước embed:knowledge
        embedding: [],

        metadata: {
          chunkIndex: chunk.chunkIndex,
          source: "admission-2026-demo",
        },
      }))
    );

    console.log("=================================");
    console.log("Seed knowledge thành công!");
    console.log("=================================");

    console.log("Document ID:", document._id);
    console.log("Số lượng chunks:", chunks.length);

    process.exit(0);
  } catch (error) {
    console.error("Seed knowledge error:", error);
    process.exit(1);
  }
};

seedKnowledge();