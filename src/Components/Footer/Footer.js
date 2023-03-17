import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-item">
        <h2 className="footer-item-heading">Shop</h2>
        <div className="footer-item-details">
          <div className="background-effect">
            <p>Mens</p>
          </div>
          <div className="background-effect">
            <p>Womens</p>
          </div>
          <div className="background-effect">
            <p>Kids</p>
          </div>
          <div className="background-effect">
            <p>Unisex</p>
          </div>
        </div>
      </div>
      <div className="footer-item">
        <h2 className="footer-item-heading">About</h2>
        <div className="footer-item-details">
          <div className="background-effect">
            <p>About Us</p>
          </div>
          <div className="background-effect">
            <p>Contact Us</p>
          </div>
          <div className="background-effect">
            <p>T & C</p>
          </div>
          <div className="background-effect">
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
      <div className="footer-item">
        <h2 className="footer-item-heading">Help</h2>
        <div className="footer-item-details">
          <div className="background-effect">
            <p>Customer Care</p>
          </div>
          <div className="background-effect">
            <p>Size Guide</p>
          </div>
          <div className="background-effect">
            <p>Coupon Codes</p>
          </div>
          <div className="background-effect">
            <p>Return/Exchange</p>
          </div>
        </div>
      </div>
      <div className="footer-item">
        <h2 className="footer-item-heading">Follow us</h2>
        <div className="footer-item-details">
          <div className="background-effect">
            <img src="images/instagram.png" alt="" />
            <p>Instagram</p>
          </div>
          <div className="background-effect">
            <img src="images/twitter.png" alt="" />
            <p>Twitter</p>
          </div>
          <div className="background-effect">
            <img src="images/youtube.png" alt="" />
            <p>Youtube</p>
          </div>
          <div className="background-effect">
            <img src="images/linkedin.png" alt="" />
            <p>Linkedin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
