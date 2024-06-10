import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { Input } from "../../GS-Libs";
import swal from "sweetalert";
import { checkValidEmail } from "../../GS-Libs/utils/checkValidEmail";

const LoginForm = ({ setUserAuthToken, setShowLogin }) => {
  const initailUserValue = {
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
  const navigate = useNavigate();
  const [user, setUser] = useState(initailUserValue);

  const handleLogin = (event) => {
    event.preventDefault();

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
    if (user.useremail.value === "" || user.password.value === "") {
      return;
    }

    fetch(`${SERVER_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        user: user,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          swal("Oops!", "User not found", "error");
          setUser(initailUserValue);
          throw new Error("Unauthorized");
        }
        return response.json();
      })
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
            placeholder="Email"
            value={user.useremail.value}
            onChange={(e) =>
              setUser((prev) => {
                return {
                  ...prev,
                  useremail: {
                    ...prev.useremail,
                    isValid: true,
                    value: e.target.value,
                  },
                };
              })
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
            className="login-password"
            placeholder="Password"
            value={user.password.value}
            onChange={(e) =>
              setUser((prev) => {
                return {
                  ...prev,
                  password: {
                    ...prev.password,
                    isValid: true,
                    value: e.target.value,
                  },
                };
              })
            }
            isRequired={true}
            isValid={user.password.isValid}
            errorMessage={user.password.errorMessage}
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
