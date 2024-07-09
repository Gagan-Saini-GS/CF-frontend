import React from "react";

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

  return (
    <div>
      <input
        className={className}
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
        onFocus={() => console.log("Focus")}
        onBlur={() => console.log("Blur")}
        readOnly={readOnly}
      />
      {errorMessage && <span className="text-Red text-sm">{errorMessage}</span>}
    </div>
  );
};
