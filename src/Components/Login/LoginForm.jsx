import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { Input } from "../../GS-Libs";
import swal from "sweetalert";
import useForm from "../../hooks/useForm";
import {
  loginInitailValues,
  loginValidations,
} from "../../validations/login-validations";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginForm = ({ setUserAuthToken, setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
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
          setUser(loginInitailValues);
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((data) => {
        const authToken = data.authToken;
        localStorage.setItem("CF_authToken", authToken);
        setUserAuthToken(authToken);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Something went wrong", "error");
      });
  };

  const {
    formData: user,
    setFormData: setUser,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(loginInitailValues, loginValidations, handleLogin);

  return (
    <div className="w-full">
      <form className="form-box" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            name="email"
            className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            errorMessage={errors.email}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              errorMessage={errors.password}
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>
          <div className="extra-form-items">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" />
              Remember me
            </div>
            <div>Forgot Password?</div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-Purple p-2 rounded text-white text-center cursor-pointer mt-10"
        >
          Login
        </button>
      </form>
      <div className="signup-info">
        Don't have an account {"  "}
        <span
          onClick={() => {
            setShowLogin(false);
          }}
          className="text-Purple"
        >
          Sign-up here!
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
