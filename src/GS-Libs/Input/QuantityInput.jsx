import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Input } from "./input";

const QuantityInput = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-end gap-1">
      <div
        className="text-sm bg-Gray/20 rounded w-6 h-6 flex items-center justify-center"
        onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
      >
        <FaMinus
          className={`${
            quantity === 1 ? "opacity-50 cursor-default" : "cursor-pointer"
          } w-4 h-4 text-sm`}
        />
      </div>
      <Input
        type="number"
        name="quantity"
        value={quantity}
        readOnly={true}
        className="border border-Purple rounded text-sm font-medium w-6 h-6 text-center"
      />
      <div
        className="text-sm bg-Gray/20 rounded w-6 h-6 flex items-center justify-center"
        onClick={() => setQuantity((prev) => (prev < 10 ? prev + 1 : 10))}
      >
        <FaPlus
          className={`${
            quantity === 10 ? "opacity-50 cursor-default" : "cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
};

export default QuantityInput;
