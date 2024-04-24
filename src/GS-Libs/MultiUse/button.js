import React from "react";

export const Button = ({ ButtonText, onClick, className }) => {
  return (
    <div onClick={onClick} className={className}>
      <div>{ButtonText}</div>
    </div>
  );
};
