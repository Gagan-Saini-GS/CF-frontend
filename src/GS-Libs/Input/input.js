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
    <div>
      <input
        className={className}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
