import React from "react";
import { MdSpaceDashboard, MdInsertComment } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { TbTruckReturn } from "react-icons/tb";
import { useTheme } from "../../../context/themeContext";

const SellerNavigationItemList = [
  // {
  //   id: "dashboard",
  //   name: "Dashboard",
  //   Icon: <MdSpaceDashboard className="w-5 h-5" />,
  // },
  // {
  //   id: "orders",
  //   name: "Orders",
  //   Icon: <FaShoppingBag className="w-5 h-5" />,
  // },
  {
    id: "products",
    name: "Products",
    Icon: <HiOutlineUpload className="w-5 h-5" />,
  },
  // {
  //   id: "reviews",
  //   name: "Reviews",
  //   Icon: <MdInsertComment className="w-5 h-5" />,
  // },
  // {
  //   id: "return-orders",
  //   name: "Return orders",
  //   Icon: <TbTruckReturn className="w-5 h-5" />,
  // },
];

const SellerNavigationItem = ({ Icon, name, isActive }) => {
  return (
    <div
      className={`flex items-center p-2 rounded-md cursor-pointer shadow-md transition-all duration-150 ${
        isActive
          ? "bg-Purple text-White"
          : "hover:text-Purple border border-Gray border-dashed hover:border-solid hover:border-Purple"
      }`}
    >
      <div className="mr-2">{Icon}</div>
      <div className="font-medium uppercase">{name}</div>
    </div>
  );
};

const SellerNavigation = ({ selectedNavbarItem, setSelectedNavbarItem }) => {
  const { theme } = useTheme();

  const handleSelectNavbarItem = (id) => {
    setSelectedNavbarItem(id);
  };

  return (
    <div
      className={`w-full h-full p-2 border-r  ${
        theme === "light"
          ? "border-Black/40 bg-White text-Black"
          : "border-White/40 bg-Black text-White"
      }`}
    >
      <div className="text-xl font-semibold mb-2 cursor-default border-b border-Gray pb-2">
        Admin Panel
      </div>
      <div className="flex flex-col gap-2">
        {SellerNavigationItemList.map((item) => {
          return (
            <div onClick={() => handleSelectNavbarItem(item.id)} key={item.id}>
              <SellerNavigationItem
                {...item}
                isActive={item.id === selectedNavbarItem}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerNavigation;
