import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarRightOptions from "./NavbarRightOptions";
import ProfileSlider from "../Profile/ProfileSlider";
import CartSlider from "../Cart/CartSlider";
import { profileInitailValues } from "../../validations/profile-form";
import CFLogoImage from "../../Assets/images/closet fashion-logos.jpeg";
import useAPI from "../../hooks/useAPI";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useTheme } from "../../context/themeContext";

export default function Navbar({
  showProfileSlider,
  setShowProfileSlider,
  showCartSlider,
  setShowCartSlider,
  userAuthToken,
  setUserAuthToken,
  showFilterSection,
  setShowFilterSection,
}) {
  const { theme } = useTheme();
  const [searchFlag, setSearchFlag] = useState(false);
  const [userDetails, setUserDetails] = useState(profileInitailValues);

  const { data } = useAPI(
    "post",
    "/user-details",
    userAuthToken ? true : false,
    {},
    {
      "Content-Type": "application/json",
      authorization: `Bearer ${userAuthToken}`,
    }
  );

  useEffect(() => {
    if (data) {
      setUserDetails(data.userDetails);
    }
  }, [data]);

  return (
    <div
      className={`flex items-center shadow px-4 py-2 md:py-4 sticky top-0 z-50 ${
        theme === "light"
          ? "bg-White text-Black shadow-Black/10"
          : "bg-Black text-White shadow-Light/30"
      }`}
    >
      {searchFlag !== undefined && !searchFlag && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div
              className="md:hidden"
              onClick={() => setShowFilterSection((prev) => !prev)}
            >
              {showFilterSection ? (
                <RxCross1 className="w-6 h-6 font-semibold" />
              ) : (
                <FiMenu className="w-6 h-6 font-semibold" />
              )}
            </div>
            <Link to="/home">
              <img
                src={CFLogoImage}
                alt=""
                className="w-6 h-6 md:w-8 md:h-8 rounded"
              />
            </Link>
            <div className="font-medium md:font-semibold text-sm sm:text-lg md:text-2xl">
              Closet Fashion
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NavbarRightOptions
              userAuthToken={userAuthToken}
              profileImage={userDetails?.profileImage}
              name={userDetails?.name}
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
