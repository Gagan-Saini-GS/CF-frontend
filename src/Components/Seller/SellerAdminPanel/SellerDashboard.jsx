import React, { useState } from "react";
import SellerNavigation from "./SellerNavigation";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./Orders/Orders";
import Products from "./Products/Products";

const SellerDashboard = () => {
  const [selectedNavbarItem, setSelectedNavbarItem] = useState("products");

  const getComponent = (item) => {
    switch (item) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <Orders />;
      case "products":
        return <Products />;
      case "reviews":
        return <div>Reviews</div>;
      case "return-orders":
        return <div>Return Orders</div>;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-full xs:w-3/5 md:w-1/4 xl:w-1/5">
        {/* Left Section (Navbar) */}
        <SellerNavigation
          selectedNavbarItem={selectedNavbarItem}
          setSelectedNavbarItem={setSelectedNavbarItem}
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/4 xl:w-4/5 p-4">
        {getComponent(selectedNavbarItem)}
      </div>
    </div>
  );
};

/***
 *
 * Side Navigation Options
 * ````````````````````````
 * 1. Dashboard
 * 2. Orders
 * 3. Products
 * 4. Reviews
 * 5. Return orders
 *
 * Dashboard Section (Cards)
 * ``````````````````````````
 * 1. Total Earnings
 * 2. Ordered Products
 * 3. Your Total Uploaded Products
 * 4. Return Requests
 *
 * Product Table Data Columns
 * ```````````````````````````
 * 1. ID (Number 1 to...)
 * 2. Name/title
 * 3. Primary Image
 * 4. Product Price
 * 5. Quantity (Stock)
 * 6. Status (Like Out of stock (red), Available (green), ordered from Manufacturer (yellow))
 * 7. Created at date & last updated date (any one)
 * 8. Edit & Delete option on row hover
 *
 * Order Table Data Columns
 * `````````````````````````
 * 1. Order Id
 * 2. Product Name
 * 3. Product primary image
 * 4. Product Price
 * 5. Product Quantity
 * 6. Order Status (Pending or Delivered)
 * 7. Ordered user (Who ordered)
 *
 * Review Card Data Array
 * ```````````````````````
 * 1. Product Image
 * 2. Product Name
 * 3. Review message
 * 4. Rating (Upto 5 Star)
 * 5. User Profile Image & Name
 *
 */

export default SellerDashboard;
