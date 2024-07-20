import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { Input } from "./input";
import { useTheme } from "../../context/themeContext";

const RangePicker = ({
  label,
  minRangeLabel,
  minRangeValue,
  maxRangeLabel,
  maxRangeValue,
  setSelectedFilters,
}) => {
  const { theme } = useTheme();
  const [values, setValues] = useState([minRangeValue, maxRangeValue]);

  useEffect(() => {
    setSelectedFilters((prev) => ({
      ...prev,
      price: [
        {
          minimum: values[0],
          maximum: values[1],
        },
      ],
    }));
  }, [values]);

  return (
    <div className="p-2 pb-4 rounded-md shadow-md w-full max-w-md mx-auto border border-Gray border-dashed">
      <div className="text-xl font-semibold pb-2">{label}</div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label
            htmlFor="minRangeValue"
            className="block text-sm font-medium text-Gray"
          >
            {minRangeLabel}
          </label>
          <Input
            type="number"
            className={`block w-full rounded border border-dashed border-Gray focus:border-Purple focus:Purple sm:text-sm px-2 py-1 ${
              theme === "light" ? "bg-White text-Black" : "bg-Black text-White"
            }`}
            value={values[0]}
            onChange={(e) => setValues((prev) => [e.target.value, prev[1]])}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="maxRangeValue"
            className="block text-sm font-medium text-Gray"
          >
            {maxRangeLabel}
          </label>
          <Input
            type="number"
            className={`block w-full rounded border border-dashed border-Gray focus:border-Purple focus:Purple sm:text-sm px-2 py-1 ${
              theme === "light" ? "bg-White text-Black" : "bg-Black text-White"
            }`}
            value={values[1]}
            onChange={(e) => setValues((prev) => [prev[0], e.target.value])}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <ReactSlider
          className="slider mt-5 w-full h-1 rounded"
          trackClassName="track"
          thumbClassName="thumb"
          value={values}
          onChange={setValues}
          min={minRangeValue}
          max={maxRangeValue}
          step={1}
        />
      </div>
    </div>
  );
};

export default RangePicker;
