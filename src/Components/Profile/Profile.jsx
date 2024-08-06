import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import uploadImage from "../../GS-Libs/utils/uploadImage";
import Button from "../../GS-Libs/Buttons/Button";
import ManProfileImage from "../../Assets/images/man.png";
import ProfileCard from "./ProfileCard";

export default function Profile({
  user,
  setUser,
  errors,
  handleChange,
  handleSubmit,
  isEditing,
  setIsEditing,
}) {
  const [showImageEditOption, setShowImageEditOption] = useState(true);

  return (
    <div className="w-full h-full relative">
      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="w-full h-full max-w-60 max-h-60 flex justify-center items-center mx-auto rounded-md">
          {isEditing && (
            <div className="absolute w-full h-full max-w-60 max-h-60 mx-auto">
              <label htmlFor="profile-image-upload">
                <div
                  className={`${
                    showImageEditOption &&
                    "absolute top-0 bg-Gray/50 z-20 w-full h-full rounded-full"
                  } ${
                    !showImageEditOption && "hidden"
                  } flex items-center justify-center cursor-pointer`}
                  onMouseEnter={() => setShowImageEditOption(true)}
                  onMouseLeave={() => setShowImageEditOption(false)}
                >
                  <MdEdit className="w-8 h-8 text-White" />
                  <input
                    type="file"
                    className="hidden"
                    id="profile-image-upload"
                    multiple={false}
                    onChange={(event) => {
                      uploadImage(event).then((res) => {
                        setUser((prev) => ({
                          ...prev,
                          profileImage: res[0],
                        }));
                      });
                    }}
                  />
                </div>
              </label>
            </div>
          )}
          <div className="relative w-full h-full">
            <img
              className="rounded-lg absolute top-0 w-full h-full max-w-60 max-h-60"
              src={
                user.profileImage !== "" ? user.profileImage : ManProfileImage
              }
              alt="Profile Image"
              onMouseEnter={() => isEditing && setShowImageEditOption(true)}
              onMouseLeave={() => isEditing && setShowImageEditOption(false)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-10">
          <ProfileCard
            label="Name"
            value={user.name}
            type="text"
            placeholder="Enter Name"
            name="name"
            isEditing={isEditing}
            onChange={(e) => handleChange(e)}
            errorMessage={errors.name}
          />
          <ProfileCard
            label="Email"
            value={user.email}
            type="text"
            placeholder="Enter Email"
            name="email"
            isEditing={isEditing}
            onChange={(e) => handleChange(e)}
            errorMessage={errors.email}
          />
          <ProfileCard
            label="Phone Number"
            value={user.phoneNumber}
            type="number"
            placeholder="Enter Phone Number"
            name="phoneNumber"
            isEditing={isEditing}
            onChange={(e) => handleChange(e)}
            errorMessage={errors.phoneNumber}
          />
          <ProfileCard
            label="Address"
            value={user.address}
            type="text"
            placeholder="Enter Address"
            name="address"
            isEditing={isEditing}
            onChange={(e) => handleChange(e)}
            errorMessage={errors.address}
          />
          <ProfileCard
            label="Website"
            value={user.website}
            type="text"
            placeholder="Enter Website URL"
            name="website"
            isEditing={isEditing}
            onChange={(e) => handleChange(e)}
            errorMessage={errors.website}
            isLink={true}
          />
        </div>

        {isEditing ? (
          <div className="absolute bottom-0 right-0 w-full flex gap-2 items-center justify-end">
            <div className="w-2/5 md:w-1/3">
              <Button
                text="Cancel"
                type="button"
                primaryColor={false}
                onClick={() => setIsEditing(false)}
              />
            </div>
            <div className="w-2/5 md:w-1/3">
              <Button text="Save" type="button" onClick={handleSubmit} />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-0 right-0 w-1/3 md:w-1/5">
            <Button
              text="Edit"
              type="button"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
      </form>
    </div>
  );
}
