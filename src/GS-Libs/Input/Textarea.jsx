import React from "react";

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
  return (
    <div>
      <textarea
        rows={rows}
        className={className}
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
      {errorMessage && <span className="text-Red text-sm">{errorMessage}</span>}
    </div>
  );
};
