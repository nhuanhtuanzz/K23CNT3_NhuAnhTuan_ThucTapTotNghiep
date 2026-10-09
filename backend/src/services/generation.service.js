const axios = require("axios");

const OLLAMA_URL = "http://127.0.0.1:11434";
const LLM_MODEL = "llama3.2";

const generateAnswer = async (question, context) => {
  if (!question || !question.trim()) {
    throw new Error("Câu hỏi không được để trống");
  }

  if (!context || !context.trim()) {
    return "Xin lỗi, tôi chưa tìm thấy thông tin phù hợp trong dữ liệu tuyển sinh.";
  }

  const prompt = `
Bạn là trợ lý tư vấn tuyển sinh đại học.

Hãy trả lời câu hỏi của người dùng dựa CHỈ trên thông tin trong CONTEXT.

QUY TẮC TRẢ LỜI:

1. Chỉ sử dụng thông tin có trong CONTEXT.
2. Không tự bịa thông tin.
3. Trả lời bằng tiếng Việt.
4. Câu trả lời phải tự nhiên, lịch sự, giống một nhân viên tư vấn tuyển sinh.
5. Không trả lời cộc lốc chỉ bằng danh sách.
6. Với câu hỏi yêu cầu liệt kê, luôn có MỘT CÂU DẪN trước danh sách.
7. Sau câu dẫn mới bắt đầu danh sách.
8. Mỗi mục nằm trên một dòng riêng.
9. Nếu CONTEXT có mã ngành thì phải đưa mã ngành.
10. Không nhắc đến CONTEXT, embedding, retrieval hoặc kỹ thuật hệ thống.

ĐẶC BIỆT VỚI CÂU HỎI VỀ CÁC NGÀNH:

Nếu người dùng hỏi:
- Có những ngành nào?
- Các ngành đào tạo gồm những gì?
- Các ngành đào tạo năm 2026 gồm những ngành nào?
- Liệt kê các ngành
- Có những ngành đào tạo nào?
- hoặc câu hỏi có ý nghĩa tương tự

THÌ BẮT BUỘC trả lời theo cấu trúc:

"Các ngành đào tạo năm 2026 gồm các ngành sau:"

Sau đó liệt kê TOÀN BỘ các ngành tìm thấy trong CONTEXT.

Ví dụ:

Các ngành đào tạo năm 2026 gồm các ngành sau:

1. Công nghệ thông tin — Mã ngành: 7480201
2. Kỹ thuật phần mềm — Mã ngành: 7480103
3. Trí tuệ nhân tạo — Mã ngành: 7480107
4. Quản trị kinh doanh — Mã ngành: 7340101
5. Kỹ thuật điện — Mã ngành: 7520201

Không được trả lời chỉ bằng:
- Công nghệ thông tin
- Kỹ thuật phần mềm
- ...

Phải luôn có câu dẫn trước danh sách.

Nếu có 5 ngành trong CONTEXT thì phải liệt kê đủ 5 ngành.
Nếu có nhiều ngành hơn thì phải liệt kê tất cả.

Chỉ liệt kê nhiều ngành khi người dùng hỏi về DANH SÁCH CÁC NGÀNH.

Ví dụ:
- Có những ngành nào?
- Các ngành đào tạo gồm những ngành nào?
- Liệt kê các ngành đào tạo.

Không coi các câu như:
- Ngành Công nghệ thông tin học những gì?
- Ngành Trí tuệ nhân tạo học những môn gì?
- Công nghệ thông tin đào tạo những nội dung nào?

là câu hỏi yêu cầu liệt kê danh sách ngành.

Trong các trường hợp trên, chỉ trả lời nội dung của ngành mà người dùng đang hỏi.
CONTEXT:
${context}

CÂU HỎI CỦA NGƯỜI DÙNG:
${question}

Hãy trả lời tự nhiên, đầy đủ và dễ đọc.

TRẢ LỜI:
`;

  try {
    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: LLM_MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.2,
          num_predict: 512,
        },
      }
    );

    return response.data.response.trim();
  } catch (error) {
    console.error(
      "Generation error:",
      error.response?.data || error.message
    );

    throw new Error(
      "Không thể tạo câu trả lời từ Ollama."
    );
  }
};

module.exports = {
  generateAnswer,
};