import React, { useState } from "react";
import "./Navbar.css";
import "./Navbar2.css";

import { Link, Navigate } from "react-router-dom";
import swal from "sweetalert";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function logout() {
    swal("Warning!", "You will be loged out", "warning", {
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((confirm) => {
      if (confirm) {
        localStorage.removeItem("authToken");
        window.location.replace("http://localhost:3000/logout");
      } else {
        console.log("You are not loged out");
      }
    });
  }

  function search(event) {
    event.preventDefault();
    const x = document.querySelector(".search-product-input").value;
    setSearchQuery(x);
    setSearchFlag(true);
  }

  window.addEventListener("resize", function () {
    // Worst code segment in closet fashion
    // Fix this with right and efficient code
    const menuContainerList = document.querySelector(".menu-container-list");
    // console.log(menuContainerList);

    const hidden = document.querySelector(".hidden-category-box");
    const box = document.querySelector(".category-box");
    const heading = document.querySelectorAll(".category-heading");
    const item = document.querySelectorAll(".category-type p");
    const subitem = document.querySelectorAll(".category-sub-item");
    if (window.innerWidth >= 1150) {
      menuContainerList.style.display = "flex";
      hidden.style.width = "75%";
      hidden.style.margin = "0px auto";
      box.style.padding = "5px 50px";
      for (let i = 0; i < heading.length; i++) {
        heading[i].style.fontSize = "1.5rem";
      }
      for (let i = 0; i < item.length; i++) {
        item[i].style.fontSize = "1.5rem";
      }
      for (let i = 0; i < subitem.length; i++) {
        subitem[i].style.margin = "5px";
      }
    } else {
      menuContainerList.style.display = "none";
    }
  });

  document.addEventListener("click", (event) => {
    const temp = document.querySelector(".user-img");
    // console.log(temp);
    // console.log(event.target);

    if (temp === event.target) {
      // console.log("Same");
      setShowProfileMenu(true);
    } else {
      setShowProfileMenu(false);
    }
  });

  function showMenu() {
    // Worst code segment in closet fashion
    // Fix this with right and efficient code
    const temp = document.querySelector(".menu-container-list");
    const hidden = document.querySelector(".hidden-category-box");
    const heading = document.querySelectorAll(".category-heading");
    const item = document.querySelectorAll(".category-type p");
    const subitem = document.querySelectorAll(".category-sub-item");
    const categoryBox = document.querySelector(".category-box");
    if (temp.style.display === "flex") {
      temp.style.display = "none";
      hidden.style.width = "50%";
      temp.classList.remove("show-menu-bar");
      for (let i = 0; i < heading.length; i++) {
        heading[i].style.fontSize = "1.5rem";
      }
      for (let i = 0; i < item.length; i++) {
        item[i].style.fontSize = "1.5rem";
      }
      for (let i = 0; i < subitem.length; i++) {
        subitem[i].style.margin = "5px";
      }
    } else {
      temp.style.display = "flex";
      temp.classList.add("show-menu-bar");
      hidden.style.width = "100%";
      categoryBox.style.padding = "5px 0px";
      for (let i = 0; i < heading.length; i++) {
        heading[i].style.fontSize = "1rem";
      }
      for (let i = 0; i < item.length; i++) {
        item[i].style.fontSize = "1rem";
      }
      for (let i = 0; i < subitem.length; i++) {
        subitem[i].style.margin = "0px";
      }
    }
  }

  return (
    <div className="outer-nav-container">
      {searchFlag !== undefined && searchFlag && (
        <Navigate to={"/products/search-results/" + searchQuery} />
      )}
      {searchFlag !== undefined && !searchFlag && (
        <div className="nav-container">
          <div className="logo-container">
            <div className="logo-img-container">
              <Link to="/home">
                <img
                  src="images/logos/closet fashion-logos.jpeg"
                  alt=""
                  className="logo-img"
                />
              </Link>
            </div>
            <div className="logo-container-item">
              <div className="logo-input-item">
                <form onSubmit={search}>
                  <input
                    type="search"
                    className="search-product-input"
                    name="product-search"
                    placeholder="Search"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="menu-container">
            <div className="menu-bars" onClick={showMenu}>
              <div className="menu-bar-item"></div>
              <div className="menu-bar-item"></div>
              <div className="menu-bar-item"></div>
            </div>
            <ul className="menu-container-list">
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
                    <h2 className="category-heading">Top Brands</h2>
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
                    <h2 className="category-heading">Under Price</h2>
                    <div className="category-type">
                      <Link to={"/products/799"}>
                        <p className="background-effect">Under 799/-</p>
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
                <img
                  className="profile-item-img cart-img"
                  src="images/carts.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="profile-item">
              <img
                className="profile-item-img user-img"
                src="images/user.png"
                alt=""
                onClick={() => {
                  setShowProfileMenu(true);
                  // setShowProfileMenu(!showProfileMenu);
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
                  <Link
                    to="/my-profile/update-profile"
                    className="profile-menu-item-link"
                  >
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
                  <Link to="" className="profile-menu-item-link">
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
      )}
    </div>
  );
}
