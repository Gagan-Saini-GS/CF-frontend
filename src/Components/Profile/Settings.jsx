import React from "react";
import ManageTheme from "../../GS-Libs/MultiUse/ManageTheme";
import ProfileDelete from "./ProfileDelete";

const Settings = ({ user }) => {
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <ManageTheme />
      <ProfileDelete user={user} />
    </div>
  );
};

export default Settings;
