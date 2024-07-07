import React, { useEffect, useState } from "react";
import { MAX_PRICE, MIN_PRICE } from "../../config";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";
import ProductCard1 from "../ProductCards/ProductCard1";
import useDebounce from "../../hooks/useDebounce";
import NoResultsFound from "../../GS-Libs/MultiUse/NoResultsFound";
import { fetchAllProducts } from "../../API/fetchAllProducts";

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

  const { data: products } = useDebounce(
    () => fetchAllProducts(selectedFilters),
    250,
    [selectedFilters]
  );

  useEffect(() => {
    if (products) {
      setAllProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (openCart) {
      setShowCartSlider(true);
    }
  }, [openCart]);

  return (
    <div className="flex bg-White">
      <div className="w-1/5 h-full hidden md:block">
        <div className="w-full h-full">
          <Filters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
      <div className="w-full h-full md:w-4/5">
        <div className="flex flex-col bg-White px-4 py-2 w-full md:w-4/5 h-full fixed">
          <div className="w-full h-full overflow-y-scroll">
            {allProducts.length > 0 ? (
              <>
                <div className="text-2xl pb-2 font-normal">All products</div>
                <div className="w-full min-h-fit h-fit grid grid-cols-2 md:grid-cols-4 gap-2 pb-28">
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
