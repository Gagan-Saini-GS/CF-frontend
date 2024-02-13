import React from "react";
import axios from "axios";
import "./SellerAccount.css";
import swal from "sweetalert";

export default function SellerAccount() {
  function becomeSeller() {
    axios
      .post("https://cf-backend-1cic.onrender.com/become-seller", {
        sellerEmail: document.querySelector(".sellerEmail").value,
        sellerPhoneNumber: document.querySelector(".sellerPhoneNumber").value,
        sellerPANCardNumber: document.querySelector(".sellerPANCardNumber")
          .value,
        sellerGSTNumber: document.querySelector(".sellerGSTNumber").value,
        authToken: localStorage.getItem("authToken"),
        "Content-type": "application/json; charset=UTF-8",
      })
      .then((response) => {
        document.querySelector(".sellerEmail").value = "";
        document.querySelector(".sellerPhoneNumber").value = "";
        document.querySelector(".sellerPANCardNumber").value = "";
        document.querySelector(".sellerGSTNumber").value = "";
        swal("Thanks!", "You become a seller now", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something is wrong", "error");
      });
  }

  return (
    <div className="seller-account-container">
      <div>
        <h2 className="hero-heading">Become A Seller!</h2>
      </div>
      <div className="seller-container">
        <div className="seller-form">
          <form
            action="/"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              becomeSeller();
            }}
          >
            <h3>Contact Details</h3>
            <div className="form-item">
              <input
                type="email"
                name="sellerEmail"
                className="sellerEmail"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-item">
              <input
                type="tel"
                name="sellerPhoneNumber"
                className="sellerPhoneNumber"
                maxLength="10"
                placeholder="Mobile Number"
                required
              />
            </div>
            <h3>Account Details</h3>
            <div className="form-item">
              <input
                type="text"
                name="sellerPANCardNumber"
                className="sellerPANCardNumber"
                placeholder="PAN Card Number"
                maxLength="10"
                required
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                name="sellerGSTNumber"
                className="sellerGSTNumber"
                placeholder="GST Number"
                maxLength="15"
                required
              />
            </div>
            <div className="checkbox-item">
              <input type="checkbox" required />
              Accept Terms and Conditions to continue
            </div>

            <div className="seller-btn-container">
              <button type="submit">Become Seller</button>
            </div>
          </form>
        </div>
        <div className="seller-side-container">
          <img src="images/shop.png" alt="" />
        </div>
      </div>
    </div>
  );
}
