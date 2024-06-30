import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import {
  GUEST_USER_EMAIL,
  GUEST_USER_PASSWORD,
  SERVER_URL,
} from "../../config";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Login(props) {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const guestUserLogin = () => {
    fetch(`${SERVER_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: { value: GUEST_USER_EMAIL },
          password: { value: GUEST_USER_PASSWORD },
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
        localStorage.setItem("authToken", authToken);
        props.setUserAuthToken(authToken);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something went wrong", "error");
      });
  };

  return (
    <div className="login-container">
      <div className="login-item">
        <div className="logo-container">
          <div className="circle">
            <div className="shopping-logo-img">
              <img src="images/online-shopping.png" alt="Online-shopping" />
            </div>
            <div className="delivery-truck-img">
              <img src="images/delivery-truck.png" alt="Delivery Truck" />
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
            <img className="user-img" src="images/man.png" alt="" />
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
            className="w-full bg-Light rounded p-2 text-center cursor-pointer border-2 border-Black/20"
          >
            Login as a Guest User
          </div>
        </div>

        <div className="bottom-logo-circle">
          <div>
            <p className="company-name">CF</p>
            <p className="company-full-name">Closet Fashion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
