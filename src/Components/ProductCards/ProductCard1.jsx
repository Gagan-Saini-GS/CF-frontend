import React, { useState } from "react";
import { toTitleCase } from "../../GS-Libs/utils/toTitleCase";
import { getDiscountedPrice } from "../../GS-Libs/utils/productUtils";

export default function ProductCard1(props) {
  const [product, setProduct] = useState(props.product);

  return (
    <div className="w-full h-56 md:h-96 p-2 rounded-md shadow-md border border-dashed border-Gray cursor-pointer hover:border-solid hover:border-Purple hover:shadow-lg">
      <div className="h-3/4">
        <img
          src={product.productImages[0]}
          alt=""
          className="w-full h-full object-fill rounded-md"
        />
      </div>
      <div className="pt-1 flex flex-col gap-1">
        <div className="text-sm sm:text-base md:text-xl font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
          {product.name}
        </div>
        <div>
          <p className="relative top-1 hidden md:block">Price</p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-0.5 md:gap-1">
              <p className="text-sm sm:text-base md:text-xl font-semibold">
                ${getDiscountedPrice(product.price)}
              </p>
              <p className="text-sm line-through text-Gray">${product.price}</p>
            </div>
            <div className="bg-Purple text-White text-base px-2 py-1 rounded items-center justify-center hidden md:flex">
              {toTitleCase(product.brand)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
