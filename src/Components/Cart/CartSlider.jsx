import React from "react";
import Cart from "./Cart";
import { ImCross } from "react-icons/im";
import { useTheme } from "../../context/themeContext";

const CartSlider = ({ showCartSlider, setShowCartSlider }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full md:w-3/4 h-full shadow shadow-Gray flex text-Black fixed overflow-hidden transition-all duration-300 ease-in-out top-0 ${
        showCartSlider ? "right-0" : "-right-full"
      } ${theme === "light" ? "bg-White text-Black" : "bg-Black text-White"}`}
    >
      <div className="bg-Purple w-12 flex flex-col items-center justify-between pt-12 pb-4 px-2"></div>
      <div className="w-full flex relative">
        <div
          className="w-7 h-7 bg-White p-2 rounded-full flex justify-center items-center cursor-pointer absolute top-2 -left-[15px] shadow-lg"
          onClick={() => setShowCartSlider(false)}
        >
          <ImCross className="w-5 h-5 text-Purple" />
        </div>
        <Cart showCartSlider={showCartSlider} />
      </div>
    </div>
  );
};

export default CartSlider;
