const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

const detectQuestionIntent = (question) => {
  const q = normalizeText(question);

  // =========================
  // CÂU HỎI DANH SÁCH NGÀNH
  // =========================
  const isMajorListQuestion =
    q.includes("cac nganh dao tao") ||
    q.includes("cac nganh hoc") ||
    q.includes("nhung nganh dao tao nao") ||
    q.includes("co nhung nganh nao") ||
    q.includes("liet ke cac nganh") ||
    q.includes("liet ke nganh") ||
    q.includes("tat ca nganh") ||
    q.includes("nganh nao duoc dao tao");

  if (isMajorListQuestion) {
    return {
      type: "MAJOR_LIST",
      majorCode: null,
      majorName: null,
    };
  }

  // =========================
  // CÔNG NGHỆ THÔNG TIN
  // =========================
  if (
    q.includes("cong nghe thong tin") ||
    q.includes("cntt")
  ) {
    return {
      type: "MAJOR_DETAIL",
      majorCode: "7480201",
      majorName: "Công nghệ thông tin",
    };
  }

  // =========================
  // KỸ THUẬT PHẦN MỀM
  // =========================
  if (
    q.includes("ky thuat phan mem") ||
    q.includes("ktpm")
  ) {
    return {
      type: "MAJOR_DETAIL",
      majorCode: "7480103",
      majorName: "Kỹ thuật phần mềm",
    };
  }

  // =========================
  // TRÍ TUỆ NHÂN TẠO
  // =========================
  if (
    q.includes("tri tue nhan tao") ||
    q.includes("nganh ai")
  ) {
    return {
      type: "MAJOR_DETAIL",
      majorCode: "7480107",
      majorName: "Trí tuệ nhân tạo",
    };
  }

  // =========================
  // QUẢN TRỊ KINH DOANH
  // =========================
  if (
    q.includes("quan tri kinh doanh") ||
    q.includes("qtkd")
  ) {
    return {
      type: "MAJOR_DETAIL",
      majorCode: "7340101",
      majorName: "Quản trị kinh doanh",
    };
  }

  // =========================
  // KỸ THUẬT ĐIỆN
  // =========================
  if (q.includes("ky thuat dien")) {
    return {
      type: "MAJOR_DETAIL",
      majorCode: "7520201",
      majorName: "Kỹ thuật điện",
    };
  }

  // =========================
  // CÂU HỎI CHUNG
  // =========================
  return {
    type: "GENERAL",
    majorCode: null,
    majorName: null,
  };
};

module.exports = {
  detectQuestionIntent,
};