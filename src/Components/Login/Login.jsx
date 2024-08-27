import React, { useEffect, useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import {
  GUEST_USER_EMAIL,
  GUEST_USER_PASSWORD,
  SERVER_URL,
} from "../../config";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import OnlineShoppingImage from "../../Assets/images/online-shopping.png";
import DeliveryTruckImage from "../../Assets/images/delivery-truck.png";
import ManProfileImage from "../../Assets/images/man.png";
import { useTheme } from "../../context/themeContext";

export default function Login(props) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const guestUserLogin = () => {
    fetch(`${SERVER_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: GUEST_USER_EMAIL,
          password: GUEST_USER_PASSWORD,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          swal("Oops!", "User not found", "error");
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((data) => {
        const authToken = data.authToken;
        localStorage.setItem("CF_authToken", authToken);
        props.setUserAuthToken(authToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something went wrong", "error");
      });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("CF_authToken");
    if (authToken) {
      navigate("/");
    }
  });

  const { theme } = useTheme();

  return (
    <div
      className={`login-container ${
        theme === "light" ? "bg-White text-Black" : "bg-Black text-White"
      }`}
    >
      <div className="login-item">
        <div className="logo-container">
          <div className="circle bg-Blue">
            <div className="shopping-logo-img">
              <img src={OnlineShoppingImage} alt="Online-shopping" />
            </div>
            <div className="delivery-truck-img">
              <img src={DeliveryTruckImage} alt="Delivery Truck" />
            </div>
          </div>
        </div>
      </div>

      <div className="login-item flex justify-center items-center">
        <div className="max-w-96">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">
              <div>Hello,</div>
              {showLogin ? (
                <p>Welcome back!</p>
              ) : (
                <p>Welcome at Closet Fashion</p>
              )}
            </div>
            <img className="user-img" src={ManProfileImage} alt="" />
          </div>
          {showLogin ? (
            <LoginForm
              setUserAuthToken={props.setUserAuthToken}
              setShowLogin={setShowLogin}
            />
          ) : (
            <SignupForm
              setUserAuthToken={props.setUserAuthToken}
              setShowLogin={setShowLogin}
            />
          )}
          <div
            onClick={guestUserLogin}
            className={`w-full rounded p-2 text-center cursor-pointer border-2 ${
              theme === "light"
                ? "bg-Light border-Black/20"
                : "bg-White/10 border-Light/50"
            }`}
          >
            Login as a Guest User
          </div>
        </div>

        <div className="bottom-logo-circle bg-Yellow text-Black/80">
          <div>
            <p className="company-name">CF</p>
            <p className="company-full-name">Closet Fashion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
