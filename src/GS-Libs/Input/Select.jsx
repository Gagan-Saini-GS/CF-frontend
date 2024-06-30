import React from "react";
import ReactSelect from "react-select";

const Select = ({
  options,
  placeholder,
  onChange,
  value,
  name,
  errorMessage,
  isMulti = false,
  maxMenuHeight = "200px",
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(153, 153, 153, 0.1)",
      borderWidth: errorMessage ? "1px" : "2px",
      borderColor: errorMessage ? "red" : "rgba(30, 30, 30, 0.2)",
      borderRadius: "4px",
      boxShadow: "none",
      padding: "2px",
      "&:hover": {
        outline: "rgba(123, 104, 238, 0.75)",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(123, 104, 238, 0.75)"
        : state.isFocused
        ? "rgba(123, 104, 238, 0.25)"
        : null,
      color: "#1e1e1e",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f0f3f6", // --White
      borderRadius: "4px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999999", // --Gray
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#1e1e1e", // --Black
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#999999", // --Blue for focused, --Gray otherwise
      "&:hover": {
        color: "#0f4392", // --Blue
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "rgba(30, 30, 30, 0.2)",
    }),
  };

  return (
    <div>
      <ReactSelect
        styles={customStyles}
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={true}
        maxMenuHeight={maxMenuHeight}
      />
      {errorMessage && <span className="text-Red text-sm">{errorMessage}</span>}
    </div>
  );
};

export default Select;
