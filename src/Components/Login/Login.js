import React, { useState } from "react";
import "./Login.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  const [user, setUser] = useState({
    useremail: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();

    fetch("https://cf-backend-1cic.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({
        user: user,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const authToken = data.authToken;
        localStorage.setItem("authToken", authToken);
        props.setUser(authToken);
        navigate("/home");
        // swal("Congrats!", "Your are loged in", "success").then(() => {
        // });
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something went wrong", "error");
      });
  };

  function handleSignup(event) {
    event.preventDefault();

    const user = {
      username: document.querySelector(".signup-username").value,
      useremail: document.querySelector(".signup-useremail").value,
      password: document.querySelector(".signup-password").value,
    };

    fetch("https://cf-backend-1cic.onrender.com/signup", {
      method: "POST",
      body: JSON.stringify({
        user: user,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const authToken = data.authToken;
        localStorage.setItem("authToken", authToken);
        navigate("/home");
        props.setUser(authToken);
        // swal("Welcome!", "Your account is created", "success").then(() => {
        //   // window.location.replace("https://closet-fashion.onrender.com/#/home");
        // });
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something went wrong", "error");
      });
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
              {showLogin ? (
                <h1>Welcome back!</h1>
              ) : (
                <h1>Welcome at Closet Fashion</h1>
              )}
            </div>
            <img className="user-img" src="images/man.png" alt="" />
          </div>

          {showLogin ? (
            <div>
              <form className="form-box" onSubmit={handleLogin}>
                <div className="form-item">
                  <input
                    type="text"
                    name="useremail"
                    className="login-useremail"
                    placeholder="Useremail"
                    value={user.useremail}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        useremail: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-item">
                  <input
                    type="password"
                    name="password"
                    className="login-password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, password: e.target.value }))
                    }
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
                Don't have an account {"  "}
                <span
                  onClick={() => {
                    setShowLogin(false);
                  }}
                >
                  Click here!
                </span>
              </div>
            </div>
          ) : (
            <div>
              <form className="form-box" onSubmit={handleSignup}>
                <div className="form-item">
                  <input
                    type="text"
                    name="username"
                    className="signup-username"
                    placeholder="Username"
                  />
                </div>
                <div className="form-item">
                  <input
                    type="email"
                    name="useremail"
                    className="signup-useremail"
                    placeholder="Useremail"
                  />
                </div>
                <div className="form-item">
                  <input
                    type="password"
                    name="password"
                    className="signup-password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-btn">
                  <button onClick={handleSignup}>Create Account</button>
                </div>
              </form>
              <div className="signup-info">
                Already have an account {"  "}
                <span
                  onClick={() => {
                    setShowLogin(true);
                  }}
                >
                  Click here!
                </span>
              </div>
            </div>
          )}

          {/* <div className="social-media-icon-box">
            <div className="social-media-icon">
              <img src="images/search.png" alt="social-media-icon" />
            </div>
            <div className="social-media-icon">
              <img src="images/facebook.png" alt="social-media-icon" />
            </div>
            <div className="social-media-icon">
              <img src="images/twitter.png" alt="social-media-icon" />
            </div>
          </div> */}
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
