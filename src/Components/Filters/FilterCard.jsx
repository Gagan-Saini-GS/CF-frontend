import React from "react";
import Checkbox from "../../GS-Libs/Input/Checkbox";

const FilterCard = ({ filter, selectedFilters, onClick }) => {
  return (
    <div className="p-2 rounded-md shadow-md w-full max-w-md mx-auto border border-Gray border-dashed">
      <div className="text-xl font-semibold pb-2">{filter.name}</div>
      <div className="flex flex-wrap gap-2">
        {filter.options.map((option) => {
          return (
            <div
              key={option.id}
              onClick={() => onClick(filter.id, option.name)}
            >
              <Checkbox
                label={option.name}
                isSelected={selectedFilters[filter.id].includes(
                  option.name.toLowerCase()
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCard;
