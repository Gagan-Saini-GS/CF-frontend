import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderCard from "../ProductCards/OrderCard";
import NotFoundImage from "../../Assets/images/not found.jpg";
import { apiCaller } from "../../GS-Libs/utils/apiCaller";

const MyOrders = ({ orders, showProfileSlider }) => {
  const [userOrders, setUserOrders] = useState([]);

  const fetchProductData = async () => {
    try {
      const data = await apiCaller("/ordered-products", "post", {
        orders: orders,
      });

      setUserOrders(data.products);
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
              <img src={NotFoundImage} alt="" className="rounded-md" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            {userOrders.reverse().map((product, productIndex) => {
              return (
                <div className="w-full" key={`${product._id}-${productIndex}`}>
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
