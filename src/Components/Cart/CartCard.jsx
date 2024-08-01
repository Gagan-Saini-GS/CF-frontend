import React from "react";
import Button from "../../GS-Libs/Buttons/Button";
import { Link } from "react-router-dom";
import { getDiscountedPrice } from "../../GS-Libs/utils/productUtils";

const CartCard = ({ product, removeFromCart }) => {
  return (
    <div className="w-full h-fit p-2 rounded-md shadow-md flex flex-col justify-between border border-dashed border-Gray cursor-pointer hover:border-solid hover:border-Purple hover:shadow-lg">
      <div className="h-64">
        <img
          src={product.productImages[0]}
          alt=""
          className="w-full h-full object-fill rounded-md"
        />
      </div>
      <div className="text-Black pt-1 flex flex-col gap-1">
        <div className="text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
          {product.name}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-Black">Price</p>
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
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          text="Remove"
          size="small"
          primaryColor={false}
          onClick={() => removeFromCart(product._id)}
        />
        <Link to={"/product/buynow/" + product._id}>
          <Button
            text="Buy Now"
            size="small"
            onClick={() => {
              console.log("Go to Buy now page");
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
