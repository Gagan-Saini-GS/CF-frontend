import React from "react";
import { useTheme } from "../../context/themeContext";

export const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  errorMessage,
  onKeyDown,
  onKeyUp,
  readOnly = false,
}) => {
  const { theme } = useTheme();

  return (
    <div>
      <input
        className={`${className} ${
          theme === "light"
            ? "bg-Gray/10 text-Black/80"
            : "bg-Black text-White/80"
        } ${
          errorMessage &&
          "placeholder:text-Red/80 text-Red/80 border border-solid border-Red/50"
        }`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
      />
      {errorMessage && (
        <span className="text-Red/80 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};
