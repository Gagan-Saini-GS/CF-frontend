import React from "react";

const FullScreenLoader = ({ message }) => {
  return (
    <div className="fullscreen-loader flex flex-col items-center justify-center">
      <div className="spinner"></div>
      <div className="mt-2">{message ? message : "Loading..."}</div>
    </div>
  );
};

export default FullScreenLoader;
