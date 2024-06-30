import React from "react";
import { Link } from "react-router-dom";
import OrderCard from "../ProductCards/OrderCard";

const MyOrders = ({ orders }) => {
  return (
    <div className="w-full h-full">
      <div className="text-2xl font-semibold pb-4 flex items-center justify-between">
        <div>My Orders</div>
        {orders.length > 0 && (
          <div className="bg-Purple text-White text-lg font-semibold p-2 rounded w-7 h-7 flex justify-center items-center">
            {orders.length}
          </div>
        )}
      </div>
      <div className="w-full h-[90%]">
        {orders.length === 0 ? (
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
            {orders.reverse().map((product, productIndex) => {
              return (
                <div className="w-[48%]">
                  <Link
                    className="product-card-link"
                    key={productIndex}
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
