import React from "react";
import Searchbar from "../../GS-Libs/Input/Searchbar";
import { PiShoppingCart } from "react-icons/pi";
import ManProfileImage from "../../Assets/images/man.png";

const NavbarRightOptions = ({
  userAuthToken,
  profileImage,
  name,
  setShowCartSlider,
  setShowProfileSlider,
}) => {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <Searchbar />
      {userAuthToken !== undefined &&
        userAuthToken !== null &&
        userAuthToken !== "" && (
          <>
            <div
              className="flex items-center gap-1 md:gap-2 cursor-pointer"
              onClick={() => setShowCartSlider(true)}
            >
              <PiShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
              <div className="text-md font-medium hidden md:block">Cart</div>
            </div>
            <div
              className="flex items-center gap-1 md:gap-2 cursor-pointer"
              onClick={() => setShowProfileSlider(true)}
            >
              <img
                className="w-6 h-6 md:w-8 md:h-8 rounded"
                src={profileImage || ManProfileImage}
                alt="Profile Image"
              />
              <div className="text-md font-medium hidden md:block">
                {name || "Profile"}
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default NavbarRightOptions;
