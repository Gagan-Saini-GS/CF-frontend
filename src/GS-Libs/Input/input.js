import React from "react";

export const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
