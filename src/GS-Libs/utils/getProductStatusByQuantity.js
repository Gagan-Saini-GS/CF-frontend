export const getProductStatusByQuantity = (quantity) => {
  if (quantity > 0) return "Available";
  if (quantity === 0) return "Out of Stock";

  return "";
};
