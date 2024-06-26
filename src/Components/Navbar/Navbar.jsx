import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";
import NavbarRightOptions from "./NavbarRightOptions";
import ProfileSlider from "../Profile/ProfileSlider";
import CartSlider from "../Cart/CartSlider";
import { profileInitailValues } from "../../validations/profile-form";

export default function Navbar({
  showProfileSlider,
  setShowProfileSlider,
  showCartSlider,
  setShowCartSlider,
  userAuthToken,
  setUserAuthToken,
}) {
  const [searchFlag, setSearchFlag] = useState(false);
  const [userDetails, setUserDetails] = useState(profileInitailValues);

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/user-details`, {
        "Content-type": "application/json; charset=UTF-8",
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        setUserDetails(response.data.userDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex items-center bg-White shadow shadow-Light px-4 py-2 md:py-4 sticky top-0 z-50">
      {searchFlag !== undefined && !searchFlag && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link to="/home">
              <img
                src="images/logos/closet fashion-logos.jpeg"
                alt=""
                className="w-6 h-6 md:w-8 md:h-8 rounded"
              />
            </Link>
            <div className="font-medium md:font-semibold text-base md:text-2xl">
              Closet Fashion
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NavbarRightOptions
              userAuthToken={userAuthToken}
              profileImage={userDetails.profileImage}
              name={userDetails.name}
              setShowCartSlider={setShowCartSlider}
              setShowProfileSlider={setShowProfileSlider}
            />

            {userAuthToken !== undefined &&
            userAuthToken !== null &&
            userAuthToken !== "" ? (
              <>
                <ProfileSlider
                  userDetails={userDetails}
                  setUserAuthToken={setUserAuthToken}
                  showProfileSlider={showProfileSlider}
                  setShowProfileSlider={setShowProfileSlider}
                />
                <CartSlider
                  showCartSlider={showCartSlider}
                  setShowCartSlider={setShowCartSlider}
                />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <div className="w-full bg-Purple px-2 py-1 rounded text-white text-center cursor-pointer">
                    Login
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
