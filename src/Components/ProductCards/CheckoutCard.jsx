import React, { useEffect, useState } from "react";
import { Input } from "../../GS-Libs";
import { FaMinus, FaPlus } from "react-icons/fa";

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
            <div className="text-Purple text-2xl">${product.price}</div>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <div
            className="text-sm bg-Gray/20 rounded text-Black w-6 h-6 flex items-center justify-center"
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            <FaMinus
              className={`${
                quantity === 1 ? "opacity-50 cursor-default" : "cursor-pointer"
              } w-4 h-4 text-sm`}
            />
          </div>
          <Input
            type="number"
            name="quantity"
            value={quantity}
            readOnly={true}
            className="border border-Purple bg-Purple text-White rounded text-sm font-medium w-6 h-6 text-center"
          />
          <div
            className="text-sm bg-Gray/20 rounded text-Black w-6 h-6 flex items-center justify-center"
            onClick={() => setQuantity((prev) => (prev < 10 ? prev + 1 : 10))}
          >
            <FaPlus
              className={`${
                quantity === 10 ? "opacity-50 cursor-default" : "cursor-pointer"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
