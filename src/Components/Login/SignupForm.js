import React, { useState } from "react";
import "./Login.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { Input } from "../../GS-Libs";

const SignupForm = ({ setUserAuthToken, setShowLogin }) => {
  const [user, setUser] = useState({
    username: "",
    useremail: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault();

    fetch(`${SERVER_URL}/signup`, {
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
        setUserAuthToken(authToken);
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something went wrong", "error");
      });
  };

  return (
    <div>
      <div>
        <form className="form-box" onSubmit={handleSignup}>
          <div className="form-item">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              className="signup-username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="form-item">
            <Input
              type="email"
              name="useremail"
              placeholder="Useremail"
              className="signup-useremail"
              value={user.useremail}
              onChange={(e) => setUser({ ...user, useremail: e.target.value })}
            />
          </div>
          <div className="form-item">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="signup-password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
    </div>
  );
};

export default SignupForm;
