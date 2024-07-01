import axios from "axios";
import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { SERVER_URL } from "../../config";
import Button from "../../GS-Libs/Buttons/Button";
import LabelValue from "../../GS-Libs/MultiUse/LabelValue";
import CheckoutCard from "../ProductCards/CheckoutCard";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productPriceDetails, setProductPriceDetails] = useState({
    discount: 0,
    deliveryCharges: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`${SERVER_URL}/access-cart-items`, {
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        setCartProducts(response.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let totalPrice = 0,
      discount = 0,
      deliveryCharges = 0;

    cartProducts?.forEach((product) => {
      const quantity = product.quantity;
      const price = product.price;

      totalPrice += quantity * price;
      discount += Math.trunc(quantity * price * 0.05);
      deliveryCharges +=
        quantity * price > 1000 ? 0 : Math.trunc(quantity * price * 0.01);
    });

    setProductPriceDetails({
      discount: discount,
      deliveryCharges: deliveryCharges,
      totalPrice: totalPrice,
    });
  }, [cartProducts]);

  if (isLoading) {
    return (
      <div className="fullscreen-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex">
      <div className="w-2/3 h-full px-4 pt-8 pb-4">
        {cartProducts?.length === 0 ? (
          <div className="w-full h-full">
            <div className="text-lg font-medium text-Gray">Empty Cart</div>
            <div className="w-full h-full flex items-center justify-center">
              <img src="images/not found.jpg" alt="" className="rounded-md" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 overflow-y-scroll">
            {cartProducts?.reverse().map((product) => {
              return <CartCard product={product} key={product._id} />;
            })}
          </div>
        )}
      </div>
      <div className="w-1/3 h-full px-4 pt-8 pb-4 bg-Gray/20 relative flex flex-col justify-between">
        <div className="w-full">
          <div className="pb-5 uppercase text-lg text-Black font-medium">
            Checkout
          </div>

          <div className="grid grid-cols-1 gap-2 overflow-y-scroll">
            {cartProducts?.reverse().map((product) => {
              return (
                <CheckoutCard
                  key={product._id}
                  product={product}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-1 font-medium pb-4">
            <LabelValue
              label="Discount"
              value={`$${productPriceDetails.discount}`}
            />
            <LabelValue
              label="Delivery Charges"
              value={
                productPriceDetails.deliveryCharges > 0
                  ? `$${productPriceDetails.deliveryCharges}`
                  : "Free Delivery"
              }
            />
            <hr className="bg-Black/40 text-Black/40 h-0.5 rounded" />
            <LabelValue
              label="Total Price"
              value={`$${productPriceDetails.totalPrice}`}
            />
          </div>
          <Button
            text="Checkout"
            onClick={() => {
              console.log("checkout");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
