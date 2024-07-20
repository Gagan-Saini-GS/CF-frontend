import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { AllFilters, MAX_PRICE, MIN_PRICE } from "../../config";
import FilterCard from "./FilterCard";
import RangePicker from "../../GS-Libs/Input/RangePicker";
import ColorFilter from "./ColorFilter";
import { useTheme } from "../../context/themeContext";

const Filters = ({ selectedFilters, setSelectedFilters }) => {
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const { theme } = useTheme();
  const selectFilters = (filterName, optionName) => {
    const alreadySelected = selectedFilters[filterName].includes(
      optionName.toLowerCase()
    );

    if (alreadySelected) {
      // Remove from selectedFilters
      setSelectedFilters((prev) => ({
        ...prev,
        [filterName]: prev[filterName].filter(
          (option) => option.toLowerCase() !== optionName.toLowerCase()
        ),
      }));
    } else {
      // Add into selectedFilters
      setSelectedFilters((prev) => ({
        ...prev,
        [filterName]: [...prev[filterName], optionName.toLowerCase()],
      }));
    }
  };

  useEffect(() => {
    if (selectedFilters) {
      let numberOfFilters = 0;
      Object.values(selectedFilters).forEach((filter) => {
        numberOfFilters += filter.length;
      });
      setNumberOfFilters(numberOfFilters);
    }
  }, [selectedFilters]);

  return (
    <div
      className={`w-full px-4 py-2 border-r ${
        theme === "light"
          ? "border-Black/40 bg-White text-Black"
          : "border-White/40 bg-Black text-White"
      }`}
    >
      <div
        className={`flex items-center justify-between pb-1 border-b ${
          theme === "light" ? "border-Black/40" : "border-White/40"
        }`}
      >
        <div className="flex gap-1 items-center">
          <IoFilter className="w-4 h-4" />
          <div className="text-lg font-semibold">Filters</div>
        </div>
        <div className="bg-Purple text-White text-lg font-semibold p-2 rounded w-7 h-7 flex justify-center items-center">
          {numberOfFilters}
        </div>
      </div>
      <div className="flex flex-col gap-4 py-2">
        <RangePicker
          label="Price Range"
          minRangeLabel="Min Price"
          minRangeValue={MIN_PRICE}
          maxRangeLabel="Max Price"
          maxRangeValue={MAX_PRICE}
          setSelectedFilters={setSelectedFilters}
        />
        <div className="flex flex-col gap-4">
          {AllFilters.map((filter) => (
            <FilterCard
              key={filter.id}
              filter={filter}
              selectedFilters={selectedFilters}
              onClick={selectFilters}
            />
          ))}
        </div>
        <ColorFilter
          selectedFilters={selectedFilters}
          onClick={selectFilters}
        />
      </div>
    </div>
  );
};

export default Filters;
