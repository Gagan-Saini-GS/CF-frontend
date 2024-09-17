import React from "react";

const DashboardCard = ({ heading }) => {
  return (
    <div className="h-40 p-4 shadow-md rounded-lg border border-Gray border-dashed hover:border-solid hover:border-Purple">
      <div className="text-xl font-medium border-b-2 border-Purple/70 pb-2 text-Purple">
        {heading}
      </div>
      <div className="rounded-md bg-Yellow/80 flex items-center justify-center text-xl font-semibold w-1/3 mt-2">
        $58243
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <DashboardCard heading="Total Earnings" />
      <DashboardCard heading="Ordered Products" />
      <DashboardCard heading="Total Uploaded Products" />
      <DashboardCard heading="Return Requests" />
    </div>
  );
};

export default Dashboard;
