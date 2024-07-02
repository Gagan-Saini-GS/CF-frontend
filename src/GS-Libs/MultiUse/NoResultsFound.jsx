import React from "react";

const NoResultsFound = ({ actionText, infoText }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <img
          src="images/error.png"
          alt="Not Results Found"
          className="max-w-96 rounded"
        />
        <p className="w-full text-center text-2xl font-medium">{infoText}</p>
        <div
          className={`w-full text-center bg-Purple text-White rounded shadow p-2 text-xl`}
        >
          {actionText}
        </div>
      </div>
    </div>
  );
};

export default NoResultsFound;
