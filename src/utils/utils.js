export const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );
export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i,${id}`;
};
export function formatCurrency(currency) {
  return new Intl.NumberFormat("de-DE").format(currency);
}
export const getIdFormNameId = (nameId) => {
  const arr = nameId.split("-i,");
  return arr[arr.length - 1];
};
export const getStringtoYear = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng tính từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0 || discountedPrice < 0) {
    return "Giá không hợp lệ";
  }
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return discount.toFixed(1) + "%";
};
export const calculateRating = (reviews) => {
  if (!Array.isArray(reviews)) {
    console.error("Invalid reviews data:", reviews);
    return {}; // Trả về một đối tượng rỗng nếu không phải mảng
  }

  const total = reviews.length;
  const percentages = {};

  // Đếm số lần xuất hiện của từng giá trị rating (1-5 sao)
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {});

  // Đảm bảo mỗi mức rating từ 1-5 đều có tỷ lệ
  for (let rating = 1; rating <= 5; rating++) {
    percentages[rating] =
      total > 0 ? (((ratingCounts[rating] || 0) / total) * 100).toFixed(2) : 0;
  }

  return percentages;
};

export const calculateAverageRating = (reviews) => {
  if (!Array.isArray(reviews)) {
    console.error("Invalid reviews data:", reviews);
    return 0; // Trả về 0 nếu không phải mảng hợp lệ
  }

  if (reviews.length === 0) return 0; // Không có đánh giá, trung bình là 0

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};
