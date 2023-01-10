import React from "react";
import "./Login.css";

export default function Login(props) {
  function handleLogin(event) {
    // alert("Hello");
    event.preventDefault();

    const user = {
      useremail: document.querySelector(".login-useremail").value,
      password: document.querySelector(".login-password").value,
    };

    // console.log(user);
    const token = "GaganIsKing";
    props.setUser(token);
  }

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
              <h1>Welcome back!</h1>
            </div>
            <img className="user-img" src="images/man.png" alt="User-Image" />
          </div>
          <form className="form-box" onSubmit={handleLogin}>
            <div className="form-item">
              <input
                type="text"
                name="username"
                className="login-useremail"
                placeholder="Username or Useremail"
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                name="password"
                className="login-password"
                placeholder="Password"
              />
            </div>
            <div className="extra-form-items">
              <div>
                <input type="checkbox" name="" />
                Remember me
              </div>
              <div>Forgot Password?</div>
            </div>
            <div className="form-btn">
              <button onClick={handleLogin}>Login</button>
            </div>
          </form>
          <div className="signup-info">
            Don't have an account <span>Click here!</span>
          </div>
          <div className="social-media-icon-box">
            <div className="social-media-icon">
              <img src="images/search.png" alt="social-media-icon" />
            </div>
            <div className="social-media-icon">
              <img src="images/facebook.png" alt="social-media-icon" />
            </div>
            <div className="social-media-icon">
              <img src="images/twitter.png" alt="social-media-icon" />
            </div>
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
