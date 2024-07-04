import React from "react";

const Checkbox = ({ label, isSelected, readOnly = false }) => {
  return (
    <div
      className={`border ${
        isSelected
          ? "border-solid border-Purple bg-Purple text-White font-semibold"
          : `border-dashed border-Gray font-medium ${
              !readOnly && "hover:text-Purple"
            }`
      } px-2 py-1 inline-block rounded text-Gray min-w-8 text-center transition-all duration-150 ${
        !readOnly && "hover:border-solid hover:border-Purple"
      } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
    >
      {label}
    </div>
  );
};

export default Checkbox;
