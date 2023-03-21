import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import CartCard from "./CartCard";
import Footer from "../Footer/Footer";

export default function Cart() {
  const [cartProduct, setCartProducts] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [delivery, setDelivery] = useState(0);

  useEffect(() => {
    axios
      .post("http://localhost:5000/access-cart-items", {
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        // console.log(response.data.products);
        setCartProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function removeCartProduct(arr) {
    setCartProducts(arr);
  }

  function quantityChange(price) {
    setTotalPrice((prev) => {
      return prev + price;
    });
    setDelivery((prev) => {
      return prev + Math.trunc(price * 0.02);
    });

    setDiscount((prev) => {
      return prev + Math.trunc(price * 0.05);
    });
  }

  return (
    <div className="cart-container">
      <Navbar />
      <div className="cart-main-section">
        <div className="products-container">
          {cartProduct !== undefined && cartProduct.length === 0 && (
            <div className="not-found-img">
              <img src="images/not found.jpg" alt="" />
              <h2>Your cart is empty!</h2>
            </div>
          )}
          {cartProduct !== undefined &&
            cartProduct.map((product, index) => {
              totalPrice += product.price;
              delivery += Math.trunc(product.price * 0.02);
              discount += Math.trunc(product.price * 0.05);
              return (
                <CartCard
                  key={index}
                  product={product}
                  quantityChange={quantityChange}
                  removeCartProduct={removeCartProduct}
                />
              );
            })}
        </div>
        <div className="side-card">
          <div className="side-card-item">
            <div>Subtotal</div>
            <div>{totalPrice} /-</div>
          </div>
          <div className="side-card-item">
            <div>Delivery Charge</div>
            <div>{delivery} /-</div>
          </div>
          <div className="side-card-item">
            <div>Discount</div>
            <div>{discount} /-</div>
          </div>
          <div className="side-card-item">
            <div>Total</div>
            <div>{totalPrice + delivery - discount} /-</div>
          </div>
          <div className="side-card-button">
            <button>Check Out</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
