import React, { useState } from "react";
import ProductCard2 from "../ProductCards/ProductCard2";
import { Link } from "react-router-dom";
import "./CartCard.css";
import axios from "axios";

export default function CartCard(props) {
  const product = props.product;
  // console.log(product);
  const [quantity, setQuantity] = useState(1);

  function quantityChange(price) {
    // console.log("quantity change called");
    props.quantityChange(price);
  }

  function removeProduct() {
    axios
      .post("http://localhost:5000/remove-item", {
        productID: product._id,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        console.log(response.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="cart-card-container">
      <Link className="product-card-link" to={"/product/" + product._id}>
        <ProductCard2 product={product} />
      </Link>
      <div className="cart-product-extra">
        <div className="quantity">
          <div>Quantity</div>
          <div className="quantity-item">
            <button
              onClick={() => {
                setQuantity((prev) => {
                  if (prev > 1) {
                    quantityChange(-product.price);
                    return prev - 1;
                  } else {
                    alert("Quantity can't be less than 1.");
                    return prev;
                  }
                });
              }}
            >
              -
            </button>
            {quantity}
            <button
              onClick={() => {
                setQuantity((prev) => {
                  if (prev >= 10) {
                    alert("You can order maximum 10 product at a time.");
                    return prev;
                  } else {
                    quantityChange(product.price);
                    return prev + 1;
                  }
                });
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="remove" onClick={removeProduct}>
          <img src="images/bin.png" alt="" />
        </div>
      </div>
    </div>
  );
}
