import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "./Navbar2.css";

import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { Dropdown } from "../../GS-Libs/Dropdown/Dropdown";
import { profileMenuDropdownData } from "../../GS-Libs/Profile/profileMenuDropdownData";
import {
  categoryList,
  companyList,
  priceList,
} from "../../GS-Libs/Static-Data/filterMenuLists";
import { Input } from "../../GS-Libs";

export default function Navbar({ setUserAuthToken }) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userProfileImg, setUserProfileImage] = useState("images/man.png");

  const logout = () => {
    swal("Warning!", "You will be loged out", "warning", {
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((confirm) => {
      if (confirm) {
        localStorage.removeItem("authToken");
        setUserAuthToken("");
        navigate("/logout");
      } else {
        console.log("You are not loged out");
      }
    });
  };

  const search = (event) => {
    event.preventDefault();
    setSearchFlag(true);
  };

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

  const showMenu = () => {
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
  };

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/user-details`, {
        "Content-type": "application/json; charset=UTF-8",
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        setUserProfileImage(response.data.foundUser.userProfileImg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                  <Input
                    type="search"
                    className="search-product-input"
                    name="product-search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                      {categoryList.map((category) => {
                        return (
                          <Link
                            to={"/products/" + category.linkTo}
                            key={category.id}
                          >
                            <p className="background-effect">{category.name}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="category-sub-item">
                    <h2 className="category-heading">Top Brands</h2>
                    <div className="category-type">
                      {companyList.map((company) => {
                        return (
                          <Link
                            to={"/products/" + company.linkTo}
                            key={company.id}
                          >
                            <p className="background-effect">{company.name}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="category-sub-item">
                    <h2 className="category-heading">Under Price</h2>
                    <div className="category-type">
                      {priceList.map((price) => {
                        return (
                          <Link to={"/products/" + price.linkTo} key={price.id}>
                            <p className="background-effect">
                              Under {price.name}/-
                            </p>
                          </Link>
                        );
                      })}
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
                src={userProfileImg || "images/man.png"}
                alt=""
                onClick={() => {
                  setShowProfileMenu(true);
                }}
              />
            </div>

            {showProfileMenu && (
              <div className="profile-menu">
                <Dropdown options={profileMenuDropdownData} />
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
