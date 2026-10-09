require("dotenv").config();

const connectDB = require("../config/db");

const {
  retrieveRelevantChunks,
} = require("../services/retrieval.service");

const testRetrieval = async () => {
  try {
    await connectDB();

const query = "Học phí của trường là bao nhiêu 1 tín ?";

    console.log("\nCâu hỏi:");
    console.log(query);

    console.log("\nĐang tìm knowledge liên quan...\n");

    const results = await retrieveRelevantChunks(
      query,
      3
    );

    if (results.length === 0) {
      console.log("Không tìm thấy knowledge.");
      process.exit(0);
    }

    console.log("===== KẾT QUẢ RETRIEVAL =====\n");

    results.forEach((item, index) => {
      console.log(`--- Result ${index + 1} ---`);

      console.log(
        "Similarity:",
        item.score.toFixed(4)
      );

      console.log("Content:");
      console.log(item.content);

      console.log("");
    });

    process.exit(0);
  } catch (error) {
    console.error(
      "Retrieval error:",
      error
    );

    process.exit(1);
  }
};

testRetrieval();