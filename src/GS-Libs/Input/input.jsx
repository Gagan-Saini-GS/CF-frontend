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
  /**
   * Added inline style to input tag because
   * it is overwriting from some place no matter what
   * but inline style will always be preferred so no need to worry.
   */

  const { theme } = useTheme();

  return (
    <div>
      <input
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
