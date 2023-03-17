import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
      .post("http://localhost:5000/user-details", {
        "Content-type": "application/json; charset=UTF-8",
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        console.log(response.data.foundUser);
        setUser(response.data.foundUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile-page">
      <div>
        <section className="user-info-container">
          <div className="user-img-container">
            <div>
              <img src={user.userProfileImg} alt="" />
            </div>
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
                {user.website === "" ? "Not available" : user.website}
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
              <>
                <div className="order-table-heading">
                  <p className="order-heading-item">Product Name</p>
                  <p className="order-heading-item">Price</p>
                  <p className="order-heading-item">Delivery Date</p>
                </div>
                <div className="order-details-container">
                  {user.orders.map((order, orderID) => {
                    return (
                      <div className="order-details" key={orderID}>
                        <p className="order-detail-item">{order.productName}</p>
                        <p className="order-detail-item">{order.price}</p>
                        <p className="order-detail-item">
                          {order.deliveryDate}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
