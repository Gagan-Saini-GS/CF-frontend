import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BuyNow.css";
import swal from "sweetalert";
import { SERVER_URL } from "../../config";
import { Button } from "../../GS-Libs/MultiUse/button";
import { Input } from "../../GS-Libs";

const PaymentMethods = [
  {
    id: "cod",
    name: "Cash On Delivery",
    value: "cod",
  },
  {
    id: "upi",
    name: "UPI",
    value: "upi",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    value: "creditcard",
  },
  {
    id: "debit-card",
    name: "Debit Card",
    value: "debitcard",
  },
  // {
  //   id: "net-banking",
  //   name: "Net Banking",
  //   value: "netbanking",
  // },
];

const PaymentItem = ({ name, value, isSelected, setPaymentMethod }) => {
  return (
    <div
      className={`payment-item ${isSelected && "payment-item-selected"}`}
      onClick={() => setPaymentMethod({ isValid: true, paymentMethod: value })}
    >
      <div>{name}</div>
    </div>
  );
};

export default function BuyNow() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState();
  const [phoneNumber, setPhoneNumber] = useState({
    phoneNumber: "",
    isValid: true,
  });
  const [address, setAddress] = useState({
    address: "",
    isValid: true,
  });

  const [paymentMethod, setPaymentMethod] = useState({
    paymentMethod: "",
    isValid: true,
  });

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
        setPhoneNumber((prev) => ({
          ...prev,
          phoneNumber: response.data.userDetails.phoneNumber,
        }));
        setAddress((prev) => ({
          ...prev,
          address: response.data.userDetails.address,
        }));
        setProduct(response.data.productDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkout = () => {
    if (
      phoneNumber.phoneNumber === undefined ||
      phoneNumber.phoneNumber.length !== 10
    ) {
      setPhoneNumber((prev) => ({ ...prev, isValid: false }));
      // return;
    }

    if (address.address === undefined || address.address.length === 0) {
      setAddress((prev) => ({ ...prev, isValid: false }));
      // return;
    }

    if (paymentMethod.paymentMethod === "") {
      setPaymentMethod((prev) => ({ ...prev, isValid: false }));
    }

    if (
      phoneNumber.phoneNumber === undefined ||
      phoneNumber.phoneNumber.length !== 10 ||
      address.address === undefined ||
      address.address.length === 0 ||
      paymentMethod.paymentMethod === ""
    ) {
      return;
    }

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
        console.log(err);
      });
  };

  const decrease = () => {
    if (imgIndex >= 1) setImgIndex(imgIndex - 1);
    else setImgIndex(product.productImg.length - 1);
  };

  const increase = () => {
    if (imgIndex < product.productImg.length - 1) setImgIndex(imgIndex + 1);
    else setImgIndex(0);
  };

  console.log(user);

  return (
    <div className="buy-now-container">
      <div className="buy-now-item">
        {product !== undefined && (
          <div className="product-container">
            <div className="product-img-box">
              <img src={product.productImg[imgIndex]} alt="" />
              {product.productImg.length > 1 && (
                <div className="img-btn-container">
                  <Button
                    ButtonText="Prev"
                    onClick={decrease}
                    className="btn"
                  />
                  <Button
                    ButtonText="Next"
                    onClick={increase}
                    className="btn"
                  />
                </div>
              )}
            </div>
            <div className="product-info-container">
              <div className="product-name-price">
                <div className="product-info-item">{product.name}</div>
                <div className="product-info-item">₹ {product.price}/-</div>
              </div>
              <div className="product-description">{product.description}</div>
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
              <p>Phone Number</p>
              {user.phoneNumber ? (
                <>{user.phoneNumber}</>
              ) : (
                <div className="user-info-input">
                  <Input
                    type="number"
                    placeholder="Enter Phone Number"
                    className={`user-input ${
                      !phoneNumber.isValid ? "validation-error-input" : ""
                    }`}
                    value={phoneNumber.phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber({
                        isValid: true,
                        phoneNumber: e.target.value,
                      });
                    }}
                  />
                  {!phoneNumber.isValid && (
                    <span className="validation-error-msg">
                      Please enter a valid phone number.
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="user-info-item">
              <p>Address</p>
              {user.address ? (
                <>{user.address}</>
              ) : (
                <div className="user-info-input">
                  <Input
                    type="text"
                    placeholder="Enter Address"
                    className={`user-input ${
                      !address.isValid ? "validation-error-input" : ""
                    }`}
                    value={address.address}
                    onChange={(e) => {
                      setAddress({
                        isValid: true,
                        address: e.target.value,
                      });
                    }}
                  />
                  {!address.isValid && (
                    <span className="validation-error-msg">
                      Please enter a valid address.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <div>
          <h3 className="payment-method-heading">Select Your Payment Method</h3>
          {!paymentMethod.isValid && (
            <span className="validation-error-msg">
              Please Select Payment Method
            </span>
          )}
          <div className="payment-method-box">
            {PaymentMethods.map((paymentItem) => {
              return (
                <PaymentItem
                  key={paymentItem.id}
                  name={paymentItem.name}
                  value={paymentItem.value}
                  isSelected={paymentMethod.paymentMethod === paymentItem.value}
                  setPaymentMethod={setPaymentMethod}
                />
              );
            })}
          </div>
        </div>
        <div className="checkout-btn">
          <button onClick={checkout}>Check Out</button>
        </div>
      </div>
    </div>
  );
}
