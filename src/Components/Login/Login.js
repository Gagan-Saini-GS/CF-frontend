import React, { useState } from "react";
import "./Login.css";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function Login(props) {
  const [showLogin, setShowLogin] = useState(true);

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

      <div className="login-item">
        <div className="form-container">
          <div className="greet-container">
            <div className="greet-message">
              <h1>Hello,</h1>
              {showLogin ? (
                <h1>Welcome back!</h1>
              ) : (
                <h1>Welcome at Closet Fashion</h1>
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
