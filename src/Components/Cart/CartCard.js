import React, { useState } from "react";
import ProductCard2 from "../ProductCards/ProductCard2";
import { Link } from "react-router-dom";
import "./CartCard.css";
import axios from "axios";

export default function CartCard(props) {
  const product = props.product;
  const [quantity, setQuantity] = useState(1);

  function quantityChange(price) {
    props.quantityChange(price);
  }

  function removeProduct() {
    // const temp = product.price;
    // console.log(product);
    axios
      .post("http://localhost:5000/remove-item", {
        productID: product._id,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        // console.log(response.data);
        props.removeCartProduct(response.data);
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
              onClick={async () => {
                let flag = false;

                const x = async () => {
                  setQuantity((prev) => {
                    if (prev > 1) {
                      flag = true;
                      return prev - 1;
                    } else {
                      alert("Quantity can't be less than 1.");
                      return prev;
                    }
                  });
                };

                // This line is just to wait for complete the task x.
                const y = await x();

                if (flag) {
                  const temp = -1 * product.price;
                  quantityChange(temp);
                }
              }}
            >
              -
            </button>
            {quantity}
            <button
              onClick={async () => {
                let flag = false;
                const x = async () => {
                  setQuantity((prev) => {
                    if (prev >= 10) {
                      alert("You can order maximum 10 product at a time.");
                      return prev;
                    } else {
                      flag = true;
                      return prev + 1;
                    }
                  });
                };

                // This line is just to wait for complete the task x.
                const y = await x();

                if (flag) {
                  quantityChange(product.price);
                }
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
