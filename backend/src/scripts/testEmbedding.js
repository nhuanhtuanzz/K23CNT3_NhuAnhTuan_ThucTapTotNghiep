const { createEmbedding } = require("../services/embedding.service");

const test = async () => {
  try {
    const text = "Ngành Công nghệ thông tin học phí bao nhiêu?";

    const embedding = await createEmbedding(text);

    console.log("Embedding thành công!");
    console.log("Số chiều:", embedding.length);
    console.log("Một phần vector:", embedding.slice(0, 10));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

test();