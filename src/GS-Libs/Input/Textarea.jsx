import React from "react";
import { useTheme } from "../../context/themeContext";

export const Textarea = ({
  name,
  value,
  onChange,
  placeholder,
  className,
  errorMessage,
  onKeyDown,
  onKeyUp,
  rows = 5,
}) => {
  const { theme } = useTheme();

  return (
    <div>
      <textarea
        rows={rows}
        className={`${className} ${
          theme === "light"
            ? "bg-Gray/10 text-Black/80"
            : "bg-Black text-White/80"
        }`}
        style={
          errorMessage
            ? {
                border: "1px solid red",
              }
            : null
        }
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      ></textarea>
      {errorMessage && (
        <span className="text-Red/80 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};
