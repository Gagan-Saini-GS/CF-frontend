import React from "react";
import { useTheme } from "../../context/themeContext";
import { MdLightMode, MdNightlight } from "react-icons/md";

const ManageTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="border-dashed border border-Gray p-2 rounded-md flex justify-between items-center w-full cursor-pointer hover:border-Purple hover:border-solid hover:bg-Purple hover:text-White transition-all duration-75 ease-in-out"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <div>Theme</div>
      <div>
        {theme === "dark" ? (
          <MdLightMode className="w-5 h-5" />
        ) : (
          <MdNightlight className="w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default ManageTheme;
