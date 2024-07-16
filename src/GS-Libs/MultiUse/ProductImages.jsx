import React, { useState } from "react";

const ProductImages = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="flex flex-col xs:flex-row sm:flex-col lg:flex-row gap-2 lg:col-span-4">
      {product?.productImages && (
        <div className="rounded-md">
          <img
            className="w-full h-full xs:w-[330px] xs:h-[412px] lg:max-w-[350px] lg:max-h-[432px] rounded-md border-dashed border border-Gray p-2 shadow-md"
            src={product?.productImages[imageIndex]}
            alt=""
          />
        </div>
      )}
      {
        <div className="flex flex-row xs:flex-col sm:flex-row lg:flex-col gap-2 max-h-[432px] overflow-y-scroll">
          {product?.productImages?.map((productImage, index) => {
            return (
              <img
                className={`w-20 h-20 max-w-20 max-h-20 border ${
                  imageIndex === index
                    ? "border-solid border-Purple shadow-Purple/30"
                    : "border-dashed border-Gray"
                } p-1 shadow rounded`}
                src={productImage}
                alt=""
                onClick={() => setImageIndex(index)}
              />
            );
          })}
        </div>
      }
    </div>
  );
};

export default ProductImages;
