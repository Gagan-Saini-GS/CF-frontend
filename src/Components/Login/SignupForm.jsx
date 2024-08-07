import React, { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { Input } from "../../GS-Libs";
import useForm from "../../hooks/useForm";
import {
  signupInitailValues,
  signupValidations,
} from "../../validations/signup-validations";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignupForm = ({ setUserAuthToken, setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSignup = (event) => {
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
        localStorage.setItem("CF_authToken", authToken);
        navigate("/home");
        setUserAuthToken(authToken);
        setUser(signupInitailValues);
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
  } = useForm(signupInitailValues, signupValidations, handleSignup);

  return (
    <div>
      <div>
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
              value={user.name}
              errorMessage={errors.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
              value={user.email}
              errorMessage={errors.email}
              onChange={handleChange}
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
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
          </div>
          <button
            type="submit"
            className="w-full bg-Purple p-2 rounded text-white text-center cursor-pointer mt-10"
          >
            Create Account
          </button>
        </form>
        <div className="signup-info">
          Already have an account {"  "}
          <span
            onClick={() => {
              setShowLogin(true);
            }}
            className="text-Purple"
          >
            Sign-in here!
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
