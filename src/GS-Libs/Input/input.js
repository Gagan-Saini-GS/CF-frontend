import React from "react";

export const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  isRequired,
  isValid,
  errorMessage,
}) => {
  /**
   * Added inline style to input tag because
   * it is overwriting from some place no matter what
   * but inline style will always be preferred so no need to worry.
   */

  return (
    <>
      <input
        className={className}
        style={
          isRequired && !isValid
            ? {
                border: "2px solid red",
                boxShadow: "4px 4px 0 1px red",
              }
            : null
        }
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {isRequired && !isValid && (
        <span className="validation-error-msg">{errorMessage}</span>
      )}
    </>
  );
};
