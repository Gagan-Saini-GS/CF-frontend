import React from "react";
import Button from "../../GS-Libs/Buttons/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";
import swal from "sweetalert";

const CartCard = ({ product }) => {
  const removeFromCart = () => {
    axios
      .post(`${SERVER_URL}/remove-from-cart`, {
        productId: product._id,
        authToken: localStorage.getItem("authToken"),
      })
      .then((res) => {
        swal("Removed", "Product is removed", "info");
      })
      .catch((err) => {
        swal("OOPs", "Product is not removed", "error");
        console.log(err);
      });
  };

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
              <p className="font-semibold">${product.price}</p>
              <p className="line-through text-Gray">
                ${(product.price * 1.4).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Button
          text="Remove"
          size="small"
          primaryColor={false}
          onClick={() => removeFromCart()}
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
