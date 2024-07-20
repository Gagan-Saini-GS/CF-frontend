import React from "react";
import { useTheme } from "../../context/themeContext";
import { MdLightMode, MdNightlight } from "react-icons/md";

const ManageTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-dashed border border-Gray p-2 rounded-md flex justify-between items-center w-full cursor-pointer">
      <div>Theme</div>
      <div>
        {theme === "dark" ? (
          <MdLightMode className="w-5 h-5" onClick={() => setTheme("light")} />
        ) : (
          <MdNightlight className="w-5 h-5" onClick={() => setTheme("dark")} />
        )}
      </div>
    </div>
  );
};

export default ManageTheme;
