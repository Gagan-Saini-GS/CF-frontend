import React, { useState } from "react";
import "./Login.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { Input } from "../../GS-Libs";
import { checkValidEmail } from "../../GS-Libs/utils/checkValidEmail";

const SignupForm = ({ setUserAuthToken, setShowLogin }) => {
  const initailUserValue = {
    username: {
      value: "",
      isValid: true,
      errorMessage: "Name is required",
    },
    useremail: {
      value: "",
      isValid: true,
      errorMessage: "Email is required",
    },
    password: {
      value: "",
      isValid: true,
      errorMessage: "Password is required",
    },
  };

  const [user, setUser] = useState(initailUserValue);

  const navigate = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault();

    if (user.username.value === "") {
      setUser((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          isValid: false,
        },
      }));
    }

    if (user.useremail.value === "") {
      setUser((prev) => ({
        ...prev,
        useremail: {
          ...prev.useremail,
          isValid: false,
        },
      }));
    }

    if (user.password.value === "") {
      setUser((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          isValid: false,
        },
      }));
    }

    if (user.useremail.value !== "" && !checkValidEmail(user.useremail.value)) {
      setUser((prev) => ({
        ...prev,
        useremail: {
          ...prev.useremail,
          isValid: false,
          errorMessage: "Invalid Email format",
        },
      }));
      return;
    }

    if (
      user.username.value === "" ||
      user.useremail.value === "" ||
      user.password.value === ""
    ) {
      return;
    }
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
        setUser(initailUserValue);
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
              placeholder="Name"
              className="signup-username"
              value={user.username.value}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  username: {
                    ...prev.username,
                    isValid: true,
                    value: e.target.value,
                  },
                }))
              }
              isRequired={true}
              isValid={user.username.isValid}
              errorMessage={user.username.errorMessage}
            />
          </div>
          <div className="form-item">
            <Input
              type="email"
              name="useremail"
              placeholder="Email"
              className="signup-useremail"
              value={user.useremail.value}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  useremail: {
                    ...prev.useremail,
                    isValid: true,
                    value: e.target.value,
                  },
                }))
              }
              isRequired={true}
              isValid={user.useremail.isValid}
              errorMessage={user.useremail.errorMessage}
            />
          </div>
          <div className="form-item">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="signup-password"
              value={user.password.value}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  password: {
                    ...prev.password,
                    isValid: true,
                    value: e.target.value,
                  },
                }))
              }
              isRequired={true}
              isValid={user.password.isValid}
              errorMessage={user.password.errorMessage}
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
