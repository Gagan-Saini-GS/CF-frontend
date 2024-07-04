import React, { useEffect, useState } from "react";
import axios from "axios";
import { MAX_PRICE, MIN_PRICE, SERVER_URL } from "../../config";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";
import ProductCard1 from "../ProductCards/ProductCard1";
import useDebounce from "../../hooks/useDebounce";
import NoResultsFound from "../../GS-Libs/MultiUse/NoResultsFound";

const Home = ({ openCart, setShowCartSlider }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    colors: [],
    price: [
      {
        minimum: MIN_PRICE,
        maximum: MAX_PRICE,
      },
    ],
    sizes: [],
    materials: [],
    genders: [],
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/get-all-products`, {
        filters: selectedFilters,
      });
      setAllProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useDebounce(fetchProducts, 500, [selectedFilters]);

  useEffect(() => {
    if (openCart) {
      setShowCartSlider(true);
    }
  }, [openCart]);

  return (
    <div className={`flex relative bg-White`}>
      <div className="w-1/5 h-full">
        <div className="w-full h-full">
          <Filters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
      <div className="w-4/5">
        <div className="flex flex-col bg-White px-4 py-2 fixed w-4/5 h-full">
          <div className="w-full h-full overflow-y-scroll">
            {allProducts.length > 0 ? (
              <>
                <div className="text-2xl pb-2 font-normal">All products</div>
                <div className="w-full grid grid-cols-4 gap-2">
                  {allProducts.map((product) => {
                    return (
                      <div className="w-full" key={product._id}>
                        <Link className="" to={"/product/" + product._id}>
                          <ProductCard1 product={product} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="w-full h-full">
                <NoResultsFound
                  actionText="Please Adjust Filters"
                  infoText="Sorry! No Results Found"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
