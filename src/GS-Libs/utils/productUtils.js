/**
 * 28% Discount on the MRP Price
 */
export const getDiscountedPrice = (price) => Math.trunc(price * 0.72);

/**
 * Get Delivery Charges
 */

export const getDeliveryChagres = (price) => Math.trunc(price * 0.01);

/**
 * Product Description -> Limit to specific number
 */

export const limitText = (text, limit) => {
  const textArr = text.split(" "); // Seperated by ' ' space
  return textArr.map((txt, index) => index < limit && `${txt} `);
};
