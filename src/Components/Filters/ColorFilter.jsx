import React from "react";
import { Colors } from "../../config";
import ColorFilterCard from "./ColorFilterCard";

const ColorFilter = ({ selectedFilters, onClick }) => {
  return (
    <div className="p-2 rounded-md shadow-md w-full max-w-md mx-auto">
      <div className="text-xl font-semibold pb-2">Colors</div>
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
        {Colors.map((color) => (
          <ColorFilterCard
            key={color.id}
            color={color.color}
            onClick={onClick}
            isSelected={selectedFilters["colors"].includes(
              color.color.toLowerCase()
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
