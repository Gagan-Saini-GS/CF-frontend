import React, { useEffect, useState } from "react";
import QuantityInput from "../../GS-Libs/Input/QuantityInput";
import { getDiscountedPrice } from "../../GS-Libs/utils/productUtils";

const CheckoutCard = ({ product, cartProducts, setCartProducts }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const quantityUpdatedCartProducts = cartProducts.map((item) => {
      if (item._id === product._id) {
        item.quantity = quantity;
      }

      return item;
    });

    setCartProducts([...quantityUpdatedCartProducts]);
  }, [quantity]);

  return (
    <div
      className="border border-dashed border-Gray rounded p-1 w-full"
      key={product._id}
    >
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <div className="w-20 h-20">
            <img
              src={product.productImages[0]}
              className="w-full h-full rounded"
              alt=""
            />
          </div>
          <div>
            <div className="font-medium text-xl">{product.name}</div>
            <div className="text-Purple text-2xl">
              ${getDiscountedPrice(product.price)}
            </div>
          </div>
        </div>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      </div>
    </div>
  );
};

export default CheckoutCard;
