import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import FullScreenLoader from "../MultiUse/FullScreenLoader";

const CompleteTable = ({ columns, data }) => {
  return (
    <div className="my-5 border-dashed border-Gray border p-2 pb-0 rounded-md hover:border-Purple hover:border-solid h-[80vh] overflow-y-scroll">
      <TableHead columns={columns} />
      {data.length === 0 ? (
        <div className="w-full h-[92%] text-xl font-medium text-Gray text-center col-span-full flex flex-col justify-center z-10">
          <div className="relative w-full h-full rounded-md">
            <FullScreenLoader message="Loading Your Products..." />
          </div>
        </div>
      ) : (
        <TableBody tableData={data} />
      )}
    </div>
  );
};

export default CompleteTable;
