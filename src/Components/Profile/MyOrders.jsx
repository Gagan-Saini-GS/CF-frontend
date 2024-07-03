import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../ProductCards/OrderCard";
import axios from "axios";
import { SERVER_URL } from "../../config";

const MyOrders = ({ orders, showProfileSlider }) => {
  const [userOrders, setUserOrders] = useState([]);

  const fetchProductData = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const res = await axios.post(
        `${SERVER_URL}/ordered-products`,
        {
          orders: orders,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
        }
      );

      setUserOrders(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showProfileSlider) {
      fetchProductData();
    }
  }, [orders, showProfileSlider]);

  return (
    <div className="w-full h-full">
      <div className="text-2xl font-semibold pb-4 flex items-center justify-between">
        <div>My Orders</div>
        {userOrders.length > 0 && (
          <div className="bg-Purple text-White text-lg font-semibold p-2 rounded w-7 h-7 flex justify-center items-center">
            {userOrders.length}
          </div>
        )}
      </div>
      <div className="w-full h-[90%]">
        {userOrders.length === 0 ? (
          <div className="w-full h-full">
            <div className="text-lg font-medium text-Gray">
              You did not order anything yet!
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <img src="images/not found.jpg" alt="" className="rounded-md" />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {userOrders.reverse().map((product, productIndex) => {
              return (
                <div className="w-[48%]" key={`${product._id}-${productIndex}`}>
                  <Link
                    className="product-card-link"
                    to={"/product/" + product._id}
                  >
                    <OrderCard product={product} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
