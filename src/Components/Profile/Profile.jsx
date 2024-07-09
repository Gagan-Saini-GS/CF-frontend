import React, { useState } from "react";
import { toTitleCase } from "../../GS-Libs/utils/toTitleCase";
import { Input } from "../../GS-Libs/Input/input";
import { MdEdit } from "react-icons/md";
import uploadImage from "../../GS-Libs/utils/uploadImage";
import Button from "../../GS-Libs/Buttons/Button";
import ManProfileImage from "../../Assets/images/man.png";

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
              className="rounded-full absolute top-0 w-full h-full max-w-60 max-h-60"
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
          <div className="flex items-center gap-2 w-full">
            <p className="text-Gray w-1/3 max-w-32">Name</p>
            <div className="text-Black w-2/3">
              {isEditing ? (
                <div>
                  <Input
                    className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                    type={"text"}
                    placeholder={"Enter Name"}
                    value={user.name}
                    name={"name"}
                    errorMessage={errors.name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              ) : (
                <div className="font-semibold">
                  {user.name === "" ? "Not available" : user.name}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full">
            <p className="text-Gray w-1/3 max-w-32">Email</p>
            <div className="text-Black w-2/3">
              {isEditing ? (
                <div>
                  <Input
                    className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                    type={"text"}
                    placeholder={"Enter Email"}
                    value={user.email}
                    name={"email"}
                    errorMessage={errors.email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              ) : (
                <div className="font-semibold">
                  {user.email === "" ? "Not available" : user.email}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full">
            <p className="text-Gray w-1/3 max-w-32">Phone Number</p>
            <div className="text-Black w-2/3">
              {isEditing ? (
                <div>
                  <Input
                    className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                    type={"text"}
                    placeholder={"Enter Phone Number"}
                    value={user.phoneNumber}
                    name={"phoneNumber"}
                    errorMessage={errors.phoneNumber}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              ) : (
                <div className="font-semibold">
                  {user.phoneNumber === "" ? "Not available" : user.phoneNumber}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full">
            <p className="text-Gray w-1/3 max-w-32">Address</p>
            <div className="text-Black w-2/3">
              {isEditing ? (
                <div>
                  <Input
                    className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                    type={"text"}
                    placeholder={"Enter Address"}
                    value={user.address}
                    name={"address"}
                    errorMessage={errors.address}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              ) : (
                <div className="font-semibold">
                  {user.address === "" ? "Not available" : user.address}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full">
            <p className="text-Gray w-1/3 max-w-32">Website</p>
            <div className="text-Black w-2/3">
              {isEditing ? (
                <Input
                  className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                  type="text"
                  name={"website"}
                  placeholder={"Enter website link"}
                  value={user.website}
                  errorMessage={errors.website}
                  onChange={handleChange}
                />
              ) : (
                <div className="font-semibold">
                  {user.website === "" ? (
                    "Not available"
                  ) : (
                    <a
                      href={user.website}
                      target="_blank"
                      className="underline text-Blue"
                    >
                      Live
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* {Object.keys(user).map((item) => {
            return (
              <div key={item}>
                {item === "website" && (
                  <div
                    className="flex items-center gap-2 w-full"
                    key={user[item]}
                  >
                    <p className="text-Gray w-1/3 max-w-32">
                      {toTitleCase(item)}
                    </p>
                    <div className="text-Black w-2/3">
                      {isEditing ? (
                        <Input
                          className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                          type="text"
                          name={item}
                          placeholder={"Enter" + user[item]}
                          value={user[item]}
                          errorMessage={errors[item]}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="font-semibold">
                          {user[item] === "" ? (
                            "Not available"
                          ) : (
                            <a
                              href={user[item]}
                              target="_blank"
                              className="underline text-Blue"
                            >
                              Live
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {(item === "name" ||
                  item === "email" ||
                  item === "phoneNumber" ||
                  item === "address") && (
                  <div
                    className="flex items-center gap-2 w-full"
                    key={user[item]}
                  >
                    <p className="text-Gray w-1/3 max-w-32">
                      {toTitleCase(item)}
                    </p>
                    <div className="text-Black w-2/3">
                      {isEditing ? (
                        <div>
                          <Input
                            className="p-2 border-2 border-Black/20 bg-Gray/10 rounded text-Black w-full"
                            type={item === "phoneNumber" ? "number" : "text"}
                            placeholder={"Enter" + user[item]}
                            value={user[item]}
                            name={item}
                            errorMessage={errors[item]}
                            onChange={handleChange}
                          />
                        </div>
                      ) : (
                        <div className="font-semibold">
                          {user[item] === "" ? "Not available" : user[item]}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })} */}
        </div>

        {isEditing ? (
          <div className="absolute bottom-0 right-0 w-1/5">
            <Button text="Save" type="button" onClick={handleSubmit} />
          </div>
        ) : (
          <div className="absolute bottom-0 right-0 w-1/5">
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
