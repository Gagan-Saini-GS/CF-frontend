import React from "react";

const LabelValue = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between text-base md:text-lg">
      <div className="">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
};

export default LabelValue;
