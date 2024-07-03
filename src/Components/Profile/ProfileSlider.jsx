import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaUser, FaShopify } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import Profile from "./Profile";
import MyOrders from "./MyOrders";
import axios from "axios";
import { SERVER_URL } from "../../config";
import SellerAccount from "../Seller/SellerAccount/SellerAccount";
import useForm from "../../hooks/useForm";
import {
  profileInitailValues,
  profileValidations,
} from "../../validations/profile-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UploadProduct from "../UploadProduct/UploadProduct";

const TabOptions = [
  {
    id: "user",
    name: "User",
    icon: <FaUser className="w-5 h-5" />,
  },
  {
    id: "orders",
    name: "Orders",
    icon: <HiShoppingBag className="w-5 h-5" />,
  },
  {
    id: "seller",
    name: "Seller",
    icon: <FaShopify className="w-5 h-5" />,
  },
];

const ProfileSlider = ({
  userDetails,
  setUserAuthToken,
  showProfileSlider,
  setShowProfileSlider,
}) => {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [isEditing, setIsEditing] = useState(false);

  const updateProfile = () => {
    axios
      .patch(`${SERVER_URL}/update-profile`, {
        user: user,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          swal("Done!", "Your profile has been updated", "success");
          setIsEditing(false);
        } else {
          swal("Oops!", "Something went wrong, try again", "error");
        }
      })
      .catch((err) => {
        swal("Oops!", "Something went wrong, try again", "error");
        console.log(err);
      });
  };

  const {
    formData: user,
    setFormData: setUser,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(profileInitailValues, profileValidations, updateProfile);

  useEffect(() => {
    if (userDetails) {
      setUser(userDetails);
    }
  }, [userDetails]);

  const logout = () => {
    swal("Warning!", "You will be loged out", "warning", {
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then((confirm) => {
      if (confirm) {
        localStorage.removeItem("authToken");
        setUserAuthToken("");
      }
    });
  };

  return (
    <div
      className={`w-1/3 h-full bg-Light shadow shadow-Gray flex text-Black fixed overflow-hidden transition-all duration-300 ease-in-out top-0 ${
        showProfileSlider ? "right-0" : "-right-full"
      }`}
    >
      {/* Slider Navigation */}
      <div className="bg-Purple w-12 h-full flex flex-col items-center justify-between pt-12 pb-4 px-2">
        <div>
          {TabOptions.map((option) => {
            return (
              <div
                key={option.id}
                className={`rounded-full p-2 mb-2 hover:bg-White hover:text-Purple flex justify-center items-center cursor-pointer ${
                  activeTab === option.id
                    ? "bg-White text-Purple"
                    : "text-White"
                }`}
                onClick={() => setActiveTab(option.id)}
              >
                {option.icon}
              </div>
            );
          })}
        </div>
        <div
          className="rounded-full p-2 text-White hover:bg-White hover:text-Purple flex justify-center items-center cursor-pointer"
          onClick={logout}
        >
          <FiLogOut className="w-5 h-5 rotate-180" />
        </div>
      </div>
      <div className="px-4 py-2 w-full">
        <div
          className="w-7 h-7 bg-White p-2 rounded-full flex justify-center items-center cursor-pointer relative -left-[30px] shadow-lg"
          onClick={() => setShowProfileSlider(false)}
        >
          <ImCross className="w-5 h-5 text-Purple" />
        </div>
        <div className="flex items-center h-[95%] relative">
          <div
            className={`w-full h-full absolute p-2 rounded transition-all duration-300 ease-in-out overflow-y-scroll ${
              activeTab === "user" ? "right-0" : "-right-[120%]"
            }`}
          >
            <Profile
              user={user}
              setUser={setUser}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
          <div
            className={`w-full h-full absolute p-2 rounded transition-all duration-300 ease-in-out overflow-y-scroll ${
              activeTab === "orders" ? "right-0" : "-right-[120%]"
            }`}
          >
            <MyOrders
              orders={user.orders || []}
              showProfileSlider={showProfileSlider}
            />
          </div>
          <div
            className={`w-full h-full absolute p-2 rounded transition-all duration-300 ease-in-out overflow-y-scroll ${
              activeTab === "seller" ? "right-0" : "-right-[120%]"
            }`}
          >
            {user.isSeller ? <UploadProduct /> : <SellerAccount />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlider;
