import React, { useEffect, useState } from "react";

const Checkbox = ({ label, isSelected, onClick, readOnly = false }) => {
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  useEffect(() => {
    setIsCheckboxSelected(isSelected);
  }, [isSelected]);

  return (
    <div
      className={`border ${
        isCheckboxSelected
          ? "border-solid border-Purple bg-Purple text-White font-semibold"
          : `border-dashed border-Gray font-medium ${
              !readOnly && "hover:text-Purple"
            }`
      } px-2 py-1 inline-block rounded text-Gray min-w-8 text-center transition-all duration-150 ${
        !readOnly && "hover:border-solid hover:border-Purple"
      } ${readOnly ? "cursor-default" : "cursor-pointer"}`}
      onClick={() => {
        onClick?.();
        setIsCheckboxSelected(isCheckboxSelected ? false : true);
      }}
    >
      {label}
    </div>
  );
};

export default Checkbox;
