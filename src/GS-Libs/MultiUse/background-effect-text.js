import React from "react";

export const BackgroundEffectText = ({ text, imgUrl }) => {
  return (
    <div className="background-effect">
      {imgUrl && <img src={imgUrl} />}
      <p>{text}</p>
    </div>
  );
};
