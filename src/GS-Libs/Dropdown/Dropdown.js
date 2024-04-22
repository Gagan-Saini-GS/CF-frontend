import React from "react";
import { Link } from "react-router-dom";

const DropdownItem = ({ linkTo, text, imageURL, className }) => {
  return (
    <div>
      <Link to={linkTo} className={className}>
        <img
          className="profile-menu-icon"
          src={imageURL}
          alt="Profile Menu Icon"
        />
        <p>{text}</p>
      </Link>
    </div>
  );
};

export const Dropdown = ({ options }) => {
  return (
    <>
      {options?.map((option) => {
        return (
          <div className="profile-menu-item background-effect">
            <DropdownItem
              key={option.id}
              linkTo={option.linkTo}
              text={option.text}
              imageURL={option.imageURL}
              className={option.className}
            />
          </div>
        );
      })}
    </>
  );
};
