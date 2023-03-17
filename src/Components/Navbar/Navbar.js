import React, { useState } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";
export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  function logout() {
    localStorage.removeItem("authToken");
  }

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Link to="/home">
          <img src="images/logos/closet fashion-logos.jpeg" alt="" />
        </Link>
        <div className="profile-container-item">
          <input type="search" name="product-search" placeholder="Search" />
        </div>
      </div>
      <div className="menu-container">
        <ul>
          <li className="menu-item">Men</li>
          <li className="menu-item">Women</li>
          <li className="menu-item">Kid's</li>
          <div className="hidden-category-box">
            <div className="category-box">
              <div className="category-sub-item">
                <h2 className="category-heading">Colthing</h2>
                <div className="category-type">
                  <Link to={"/products/all-cloths"}>
                    <p className="background-effect">All Colths</p>
                  </Link>
                  <Link to={"/products/tshirts"}>
                    <p className="background-effect">T-Shirt</p>
                  </Link>
                  <Link to={"/products/shirts"}>
                    <p className="background-effect">Shirts</p>
                  </Link>
                  <Link to={"/products/shoes"}>
                    <p className="background-effect">Shoes</p>
                  </Link>
                  <Link to={"/products/hoodies"}>
                    <p className="background-effect">Hoodies</p>
                  </Link>
                </div>
              </div>
              <div className="category-sub-item">
                <h2 className="category-heading">Shop By Brand</h2>
                <div className="category-type">
                  <Link to={"/products/nike"}>
                    <p className="background-effect">Nike</p>
                  </Link>
                  <Link to={"/products/adidas"}>
                    <p className="background-effect">Adidas</p>
                  </Link>
                  <Link to={"/products/gucci"}>
                    <p className="background-effect">Gucci</p>
                  </Link>
                  <Link to={"/products/puma"}>
                    <p className="background-effect">Puma</p>
                  </Link>
                  <Link to={"/products/louisvuitton"}>
                    <p className="background-effect">Louis Vuitton</p>
                  </Link>
                </div>
              </div>
              <div className="category-sub-item">
                <h2 className="category-heading">Shop By Price</h2>
                <div className="category-type">
                  <Link to={"/products/799"}>
                    <p className="background-effect">Under 799/</p>
                  </Link>
                  <Link to={"/products/1299"}>
                    <p className="background-effect">Under 1299/-</p>
                  </Link>
                  <Link to={"/products/1899"}>
                    <p className="background-effect">Under 1899/-</p>
                  </Link>
                  <Link to={"/products/2399"}>
                    <p className="background-effect">Under 2399/-</p>
                  </Link>
                  <Link to={"/products/3099"}>
                    <p className="background-effect">Under 3099/-</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div className="profile-container">
        <div className="profile-item">
          <Link to={"/cart"}>
            <img className="cart-img" src="images/carts.png" alt="" />
          </Link>
        </div>
        <div className="profile-item">
          <img
            className="user-img"
            src="images/user.png"
            alt=""
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
            }}
          />
        </div>

        {showProfileMenu && (
          <div className="profile-menu">
            <div className="profile-menu-item background-effect">
              <Link to="/my-profile" className="profile-menu-item-link">
                <img
                  className="profile-menu-icon"
                  src="images/profile.png"
                  alt=""
                />
                <p>My Profile</p>
              </Link>
            </div>
            <div className="profile-menu-item background-effect">
              <Link to="/my-orders" className="profile-menu-item-link">
                <img
                  className="profile-menu-icon"
                  src="images/shopping-bag.png"
                  alt=""
                />
                <p>My Orders</p>
              </Link>
            </div>
            <div className="profile-menu-item background-effect">
              <Link to="/edit-profile" className="profile-menu-item-link">
                <img
                  className="profile-menu-icon"
                  src="images/pencil.png"
                  alt=""
                />
                <p>Edit Profile</p>
              </Link>
            </div>
            <div className="profile-menu-item background-effect">
              <Link to="/become-seller" className="profile-menu-item-link">
                <img
                  className="profile-menu-icon"
                  src="images/shop.png"
                  alt=""
                />
                <p>Become Seller</p>
              </Link>
            </div>
            <div className="profile-menu-item background-effect">
              <Link to="/upload-product" className="profile-menu-item-link">
                <img
                  className="profile-menu-icon"
                  src="images/shopping-cart.png"
                  alt=""
                />
                <p>Upload Product</p>
              </Link>
            </div>
            <div
              className="profile-menu-item background-effect"
              onClick={logout}
            >
              <Link to="/logout" className="profile-menu-item-link">
                <img
                  className="profile-menu-icon"
                  src="images/logout.png"
                  alt=""
                />
                <p>Logout</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
