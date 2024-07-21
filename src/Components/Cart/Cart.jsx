import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import Button from "../../GS-Libs/Buttons/Button";
import LabelValue from "../../GS-Libs/MultiUse/LabelValue";
import CheckoutCard from "../ProductCards/CheckoutCard";
import swal from "sweetalert";
import NotFoundImage from "../../Assets/images/not found.jpg";
import { apiCaller } from "../../GS-Libs/utils/apiCaller";

const Cart = ({ showCartSlider }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productPriceDetails, setProductPriceDetails] = useState({
    discount: 0,
    deliveryCharges: 0,
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartItems = async () => {
    const data = await apiCaller("/access-cart-items", "post", {});

    setCartProducts(data.products);
    setIsLoading(false);
  };

  useEffect(() => {
    if (showCartSlider) {
      setIsLoading(true);
      fetchCartItems();
    }
  }, [showCartSlider]);

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

  const checkout = async () => {
    if (cartProducts.length === 0) return;

    await apiCaller("/checkout-product", "post", {
      products: cartProducts.map((product) => ({
        _id: product._id,
        quantity: product.quantity,
      })),
    })
      .then(() => swal("Done", "Order placed successfully", "success"))
      .catch(() => swal("Oops", "Something went wrong", "error"));
  };

  const removeFromCart = async (productId) => {
    setIsLoading(true);
    await apiCaller("/remove-from-cart", "post", {
      productId: productId,
    });
    await fetchCartItems();
  };

  if (isLoading) {
    return (
      <div className="fullscreen-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-between overflow-y-scroll">
      <div className="w-full md:w-2/3 md:h-full p-2 md:px-4 md:pt-8 md:pb-4">
        {cartProducts?.length === 0 ? (
          <div className="w-full h-full pt-10">
            <div className="text-lg font-medium text-Gray">Empty Cart</div>
            <div className="">
              <img
                src={NotFoundImage}
                alt=""
                className="rounded-md max-w-64 max-h-64 md:max-w-96 md:max-h-96 "
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 md:h-full overflow-y-scroll">
            {cartProducts?.reverse().map((product) => {
              return (
                <CartCard
                  product={product}
                  key={product._id}
                  removeFromCart={removeFromCart}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="w-full md:w-1/3 md:h-full p-2 md:px-4 md:pt-8 md:pb-4 bg-Gray/20 relative flex flex-col justify-between">
        <div className="w-full">
          <div className="pb-5 uppercase text-lg font-medium">Checkout</div>

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
            onClick={checkout}
            disabled={cartProducts.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
