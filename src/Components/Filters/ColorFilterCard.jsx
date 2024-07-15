import React from "react";

const ColorFilterCard = ({ color, onClick, isSelected, readOnly }) => {
  return (
    <div
      className="flex items-center w-full"
      onClick={() => {
        onClick("colors", color);
      }}
    >
      <div
        className={`w-full flex items-center border ${
          isSelected
            ? "border-solid border-Purple bg-Purple text-White font-semibold"
            : `border-dashed border-Gray font-medium ${
                !readOnly && "hover:text-Purple"
              }`
        } p-1 rounded text-Gray font-medium min-w-8 text-center transition-all duration-150 ${
          !readOnly && "hover:border-solid hover:border-Purple"
        } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
      >
        <div
          className={`${color} min-w-6 min-h-6 mr-1 rounded border border-Black/20`}
        ></div>
        <div>
          {color.slice(0, 1).toUpperCase()}
          {color.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default ColorFilterCard;
