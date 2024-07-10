import React, { useCallback, useEffect, useRef, useState } from "react";
import { MAX_PRICE, MIN_PRICE } from "../../config";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";
import ProductCard1 from "../ProductCards/ProductCard1";
import useDebounce from "../../hooks/useDebounce";
import NoResultsFound from "../../GS-Libs/MultiUse/NoResultsFound";
import { fetchAllProducts } from "../../API/fetchAllProducts";
import { useSearchContext } from "../../context/searchContext";

const Home = ({ openCart, setShowCartSlider }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const limit = 12;
  const { searchQuery } = useSearchContext();
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
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

  const { data } = useDebounce(
    () => {
      setIsLoading(true);
      return fetchAllProducts(selectedFilters, searchQuery, page, limit);
    },
    250,
    [selectedFilters, searchQuery, page]
  );

  useEffect(() => {
    if (data?.products) {
      // If filter exist then save all products.
      if (
        selectedFilters.brands.length > 0 ||
        selectedFilters.colors.length > 0 ||
        selectedFilters.sizes.length > 0 ||
        selectedFilters.materials.length > 0 ||
        selectedFilters.genders.length > 0
      ) {
        setAllProducts([...data?.products]);
      } else {
        // For Pagination Records.
        setAllProducts((prev) => [...prev, ...data?.products]);
      }
      setTotalPages(data?.totalPages);
      setIsLoading(false);
    }
  }, [data?.products]);

  useEffect(() => {
    if (
      selectedFilters.brands.length === 0 &&
      selectedFilters.colors.length === 0 &&
      selectedFilters.sizes.length === 0 &&
      selectedFilters.materials.length === 0 &&
      selectedFilters.genders.length === 0 &&
      page !== 1
    ) {
      setAllProducts([]);
      setPage(1);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (openCart) {
      setShowCartSlider(true);
    }
  }, [openCart]);

  // Intersection Observer callback to detect when the sentinel div is visible
  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, totalPages]
  );

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
                  {allProducts.map((product, index) => {
                    return (
                      <div
                        className="w-full"
                        key={product._id}
                        ref={
                          allProducts.length === index + 1
                            ? lastProductElementRef
                            : null
                        }
                      >
                        <Link className="" to={"/product/" + product._id}>
                          <ProductCard1 product={product} />
                        </Link>
                      </div>
                    );
                  })}
                  {isLoading && (
                    <div className="pt-4 w-full text-xl font-medium text-Gray text-center col-span-full">
                      More Products Loading...
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {isLoading ? (
                  <div className="pt-4 w-full text-xl font-medium text-Gray text-center col-span-full">
                    Loading...
                  </div>
                ) : (
                  <div className="w-full h-full">
                    <NoResultsFound
                      actionText="Please Adjust Filters"
                      infoText="Sorry! No Results Found"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
