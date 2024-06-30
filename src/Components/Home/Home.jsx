import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";
import ProductCard1 from "../ProductCards/ProductCard1";

const Home = ({ openCart, setShowCartSlider }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/get-all-products`)
      .then((resposnse) => {
        setAllProducts(resposnse.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (openCart) {
      setShowCartSlider(true);
    }
  }, [openCart]);

  return (
    <div>
      <div className={`flex relative bg-White`}>
        <div className="w-1/5 h-full">
          <div className="w-full h-full">
            <Filters />
          </div>
        </div>
        <div className="w-4/5">
          <div className="flex flex-col bg-White px-4 py-2 fixed w-4/5 h-full overflow-y-scroll pb-20">
            <div className="w-full">
              <div className="text-2xl pb-2 font-normal">All products</div>
              <div className="w-full grid grid-cols-4 gap-2">
                {allProducts.map((product) => {
                  return (
                    <div className="w-full">
                      <Link
                        className=""
                        key={product._id}
                        to={"/product/" + product._id}
                      >
                        <ProductCard1 product={product} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
