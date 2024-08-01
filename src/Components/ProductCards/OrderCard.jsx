import React from "react";
import { getDiscountedPrice } from "../../GS-Libs/utils/productUtils";

const OrderCard = ({ product }) => {
  return (
    <div className="w-full h-fit p-2 rounded-md shadow-md flex flex-col justify-between border border-dashed border-Gray cursor-pointer hover:border-solid hover:border-Purple hover:shadow-lg">
      <div className="h-64">
        <img
          src={product.productImages[0]}
          alt=""
          className="w-full h-full object-fill rounded-md"
        />
      </div>
      <div className="pt-1 flex flex-col gap-1">
        <div className="text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
          {product.name}
        </div>
        <div className="w-full flex items-center justify-between pt-2">
          <p className="">Price</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <p className="font-semibold">
                ${getDiscountedPrice(product.price)}
              </p>
              <p className="line-through text-Gray">${product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
