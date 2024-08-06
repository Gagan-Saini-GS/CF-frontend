import React, { useCallback, useEffect, useRef, useState } from "react";
import { MAX_PRICE, MIN_PRICE } from "../../config";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";
import ProductCard1 from "../ProductCards/ProductCard1";
import NoResultsFound from "../../GS-Libs/MultiUse/NoResultsFound";
import { useSearchContext } from "../../context/searchContext";
import useDebouncedAPI from "../../hooks/useDebounceAPI";
import FullScreenLoader from "../../GS-Libs/MultiUse/FullScreenLoader";
import { useTheme } from "../../context/themeContext";

const Home = ({ openCart, setShowCartSlider, showFilterSection }) => {
  const { theme } = useTheme();
  const [totalPages, setTotalPages] = useState(1);
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

  const authToken = localStorage.getItem("CF_authToken");

  const { data, loading } = useDebouncedAPI(
    "post",
    "/get-all-products",
    {
      selectedFilters,
      searchQuery,
      page,
      limit,
    },
    {
      "Content-Type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
    [page],
    250
  );

  useEffect(() => {
    if (data?.products) {
      // If filter exist then save all products.
      if (
        selectedFilters.brands.length > 0 ||
        selectedFilters.colors.length > 0 ||
        selectedFilters.sizes.length > 0 ||
        selectedFilters.materials.length > 0 ||
        selectedFilters.genders.length > 0 ||
        searchQuery?.length > 0
      ) {
        setAllProducts([...data?.products]);
      } else {
        // For Pagination Records.
        setAllProducts((prev) => [...prev, ...data?.products]);
      }
      setTotalPages(data?.totalPages);
    }
  }, [data?.products]);

  useEffect(() => {
    if (
      selectedFilters.brands.length === 0 &&
      selectedFilters.colors.length === 0 &&
      selectedFilters.sizes.length === 0 &&
      selectedFilters.materials.length === 0 &&
      selectedFilters.genders.length === 0 &&
      searchQuery?.length === 0
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
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  return (
    <div
      className={`flex relative h-full ${
        theme === "light" ? "text-Black/80" : "bg-Black text-White/80"
      }`}
    >
      <div
        className={`w-full xs:w-3/5 md:w-1/4 xl:w-1/5 h-full transition-all duration-300 absolute md:relative z-10 ${
          showFilterSection ? "left-0" : "-left-full md:left-0"
        }`}
      >
        <div className="w-full h-full z-50">
          <Filters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
      <div className="w-full md:w-3/4 xl:w-4/5 h-full">
        <div className="flex flex-col px-4 py-2 w-full h-full fixed md:w-3/4 xl:w-4/5">
          <div className="w-full h-full overflow-y-scroll">
            {allProducts.length > 0 ? (
              <>
                <div className="text-2xl pb-2 font-normal">All products</div>
                <div className="w-full min-h-fit h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-2 pb-28">
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
                  {loading && (
                    <div className="pt-4 w-full text-xl font-medium text-Gray text-center col-span-full">
                      More Products Loading...
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {loading ? (
                  <div className="pt-4 w-full text-xl font-medium text-Gray text-center col-span-full">
                    <FullScreenLoader />
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
