import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BuyNow.css";
import swal from "sweetalert";
import { SERVER_URL } from "../../config";

export default function BuyNow() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState();
  const [product, setProduct] = useState();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/buy-product`, {
        authToken: localStorage.getItem("authToken"),
        productID: params.productID,
      })
      .then((response) => {
        setUser(response.data.userDetails);
        setProduct(response.data.productDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function checkout() {
    axios
      .post(`${SERVER_URL}/checkout-product`, {
        authToken: localStorage.getItem("authToken"),
        productID: params.productID,
      })
      .then((response) => {
        swal(
          "Congrats!",
          "The item is added into your order list and delivered soon when we start delivering the products.",
          "success"
        ).then(() => {
          navigate("/home");
        });
      })
      .catch((err) => {
        swal("Sorry!", "We don't start delivering products yet!", "info");
      });
  }

  return (
    <div className="buy-now-container">
      <div className="buy-now-item">
        {product !== undefined && (
          <div className="product-container">
            <div className="product-img-box">
              {/* <img src={product.productImg[]} alt="" /> */}

              <img src={product.productImg[imgIndex]} alt="" />
              <div className="img-btn-container">
                <button
                  onClick={() => {
                    if (imgIndex >= 1) {
                      setImgIndex(imgIndex - 1);
                    }
                  }}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (imgIndex < product.productImg.length - 1) {
                      setImgIndex(imgIndex + 1);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
            <div className="product-info-container">
              <div className="product-info-item">{product.name}</div>
              <div className="product-info-item">{product.price}/-</div>
            </div>
          </div>
        )}
      </div>
      <div className="buy-now-item">
        {user !== undefined && (
          <div className="user-container">
            <div className="user-info-item">
              <p>Name</p> {user.name}
            </div>
            <div className="user-info-item">
              <p>Email</p> {user.email}
            </div>
            <div className="user-info-item">
              <p>Phone Number</p> {user.phoneNumber}
            </div>
            <div className="user-info-item">
              <p>Address</p>
              {user.address}
            </div>
          </div>
        )}
        <div>
          <h3 className="payment-method-heading">Select Your Payment Method</h3>
          <div className="payment-method-box">
            <div className="payment-item">
              <label>Cash On Delivery</label>
              <input type="radio" name="payment-method" value="cod" />
            </div>
            <div className="payment-item">
              <label>UPI</label>
              <input type="radio" name="payment-method" value="upi" />
            </div>
            <div className="payment-item">
              <label>Credit Card</label>
              <input type="radio" name="payment-method" value="creditcard" />
            </div>
            <div className="payment-item">
              <label>Debit Card</label>
              <input type="radio" name="payment-method" value="debitcard" />
            </div>
            <div className="payment-item">
              <label>Net Banking</label>
              <input type="radio" name="payment-method" value="netbanking" />
            </div>
          </div>
        </div>
        <div className="checkout-btn">
          <button onClick={checkout}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
