import React, { useEffect, useState } from "react";

const Button = ({
  type,
  text,
  onClick,
  size = "medium",
  primaryColor = true,
}) => {
  const [buttonSize, setButtonSize] = useState("p-0 text-base");

  useEffect(() => {
    switch (size) {
      case "extra-small":
        setButtonSize("p-0.5 text-xs font-normal");
        break;
      case "small":
        setButtonSize("p-1 text-base font-medium");
        break;
      case "medium":
        setButtonSize("p-2 text-base font-medium");
        break;
      case "large":
        setButtonSize("p-4 text-lg font-semibold");
        break;
      case "extra-large":
        setButtonSize("p-6 text-xl font-semibold");
        break;
      default:
        setButtonSize("p-2 text-base font-normal");
    }
  }, [size]);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-center cursor-pointer rounded shadow ${
        primaryColor ? "bg-Purple text-White" : "bg-Purple/30 text-Black"
      } ${buttonSize}`}
    >
      {text}
    </button>
  );
};

export default Button;
