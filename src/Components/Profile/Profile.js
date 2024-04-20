import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard1 from "../ProductCards/ProductCard1";
import { SERVER_URL } from "../../config";

export default function Profile() {
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userProfileImg: "images/man.png",
    phoneNumber: "",
    address: "",
    website: "",
    orders: [],
  });

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/user-details`, {
        "Content-type": "application/json; charset=UTF-8",
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        setUser(response.data.foundUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile-page">
      {/* <div> */}
      <section className="user-info-container">
        <div className="user-img-container">
          {/* <div> */}
          <img
            src={
              user.userProfileImg === ""
                ? "images/man.png"
                : user.userProfileImg
            }
            alt=""
          />
          {/* </div> */}
        </div>
        <div className="user-details-container">
          <div className="user-detail-item user-name-box">
            <h2>{user.userName}</h2>
            <Link to="update-profile">
              <button>Edit Profile</button>
            </Link>
          </div>
          <div className="user-detail-item">
            <p className="user-data-type">Phone No.</p>
            <p className="user-data">
              {user.phoneNumber === "" ? "Not available" : user.phoneNumber}
            </p>
          </div>
          <div className="user-detail-item">
            <p className="user-data-type">Email</p>
            <p className="user-data">
              {user.userEmail === "" ? "Not available" : user.userEmail}
            </p>
          </div>
          <div className="user-detail-item">
            <p className="user-data-type">Address</p>
            <p className="user-data">
              {user.address === "" ? "Not available" : user.address}
            </p>
          </div>
          <div className="user-detail-item">
            <p className="user-data-type">Website</p>
            <p className="user-data">
              {user.website === "" ? (
                "Not available"
              ) : (
                <a href={user.website} target="_blank">
                  Show Website
                </a>
              )}
              {/* {user.website === "" ? "Not available" : user.website} */}
            </p>
          </div>
        </div>
      </section>
      <section className="user-orders-container">
        <div className="order-heading">My Orders</div>
        <div className="order-table">
          {user.orders.length === 0 ? (
            <div className="not-found-img">
              <h2>You did not order anything yet!</h2>
              <img src="images/not found.jpg" alt="" />
            </div>
          ) : (
            <div>
              <div className="order-details-container">
                {user.orders.map((product, productIndex) => {
                  return (
                    <Link
                      className="product-card-link"
                      key={productIndex}
                      to={"/product/" + product._id}
                    >
                      <ProductCard1 product={product} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      {/* </div> */}
    </div>
  );
}
