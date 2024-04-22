import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { Input } from "../../GS-Libs";
import swal from "sweetalert";

const LoginForm = ({ setUserAuthToken, setShowLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    useremail: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();

    fetch(`${SERVER_URL}/login`, {
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
        setUserAuthToken(authToken);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something went wrong", "error");
      });
  };

  return (
    <div>
      <form className="form-box" onSubmit={handleLogin}>
        <div className="form-item">
          <Input
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
          <Input
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
  );
};

export default LoginForm;
