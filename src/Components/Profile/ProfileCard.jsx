import React from "react";
import { Input } from "../../GS-Libs";

const ProfileCard = ({
  label,
  value,
  type,
  placeholder,
  name,
  isEditing,
  onChange,
  errorMessage,
  isLink = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full">
      <p className="text-Gray w-full md:w-1/3 max-w-32">{label}</p>
      <div className="w-full md:w-2/3">
        {isEditing ? (
          <>
            <Input
              className="p-2 border-2 border-Black/20 rounded w-full"
              type={type}
              placeholder={placeholder}
              value={value}
              name={name}
              errorMessage={errorMessage}
              onChange={onChange}
            />
          </>
        ) : (
          <div className="font-semibold">
            {value === "" ? (
              "Not available"
            ) : isLink ? (
              <a href={value} target="_blank" className="underline text-Blue">
                Live
              </a>
            ) : (
              <span>{value}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
