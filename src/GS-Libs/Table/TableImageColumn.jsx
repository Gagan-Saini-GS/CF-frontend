import React, { useState } from "react";

const TableImageColumn = ({ product }) => {
  const [showBiggerImage, setShowBiggerImage] = useState(false);
  return (
    <div className="w-10 h-10 relative bg-White z-50">
      <img
        src={product?.productImages?.[0]}
        alt=""
        className={`w-full h-full rounded-full`}
        onClick={() => setShowBiggerImage(true)}
      />
      {showBiggerImage && (
        <div
          className="absolute -top-1/2 left-10 w-52 h-64 border border-dashed border-Gray p-2 rounded-md bg-White"
          onClick={() => setShowBiggerImage(false)}
        >
          <img
            src={product?.productImages?.[0]}
            alt=""
            className="w-full h-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default TableImageColumn;
