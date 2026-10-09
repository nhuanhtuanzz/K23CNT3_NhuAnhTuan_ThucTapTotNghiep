require("dotenv").config();

const {
  generateAnswer,
} = require("../services/generation.service");

const testGeneration = async () => {
  try {
    const question =
      "Ngành Công nghệ thông tin học phí bao nhiêu?";

    const context = `
Học phí ngành Công nghệ thông tin được thu theo số tín chỉ đăng ký trong từng học kỳ. Mức học phí cụ thể phụ thuộc vào chương trình đào tạo và quy định của nhà trường từng năm.

Ngành Công nghệ thông tin có mã ngành 7480201. Ngành đào tạo các kiến thức về lập trình, cơ sở dữ liệu, mạng máy tính, công nghệ phần mềm và trí tuệ nhân tạo.

Các phương thức xét tuyển gồm xét điểm thi tốt nghiệp THPT, xét học bạ và xét tuyển thẳng theo quy định của nhà trường.
`;

    console.log("\nCâu hỏi:");
    console.log(question);

    console.log("\nĐang gọi LLM...\n");

    const answer = await generateAnswer(
      question,
      context
    );

    console.log("===== CÂU TRẢ LỜI =====\n");
    console.log(answer);

    process.exit(0);
  } catch (error) {
    console.error(
      "Generation test error:",
      error
    );

    process.exit(1);
  }
};

testGeneration();