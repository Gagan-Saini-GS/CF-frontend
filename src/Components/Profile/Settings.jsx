import React from "react";
import { MdDelete } from "react-icons/md";
import ManageTheme from "../../GS-Libs/MultiUse/ManageTheme";

const Settings = () => {
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <ManageTheme />
      <div className="border-dashed border border-Gray p-2 rounded-md flex justify-between items-center w-full hover:bg-Red/70 hover:text-White hover:border-solid hover:border-Red/70 transition-all duration-100 ease-in-out cursor-pointer">
        <div>Delete Account</div>
        <div>
          <MdDelete className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
