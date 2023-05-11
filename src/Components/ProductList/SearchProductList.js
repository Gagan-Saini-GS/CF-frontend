import React, { useEffect, useState } from "react";
import "./ProductList.css";

import { Link, useParams } from "react-router-dom";
import ProductCard2 from "../ProductCards/ProductCard2";
import axios from "axios";

export default function SearchProductList() {
  const [products, setProducts] = useState();
  const params = useParams();
  const query = params.query;

  useEffect(() => {
    axios
      .post("https://cf-backend-1cic.onrender.com/search-product", {
        searchQuery: query,
      })
      .then((response) => {
        // console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);

  return (
    <div>
      <div className="filter-text-parent">
        <h1 className="filter-text">Showing results for {query}</h1>
      </div>
      <div className="product-list-container">
        {products !== undefined &&
          products.map((product, index) => {
            return (
              <Link
                className="product-card-link"
                key={index}
                to={"/product/" + product._id}
              >
                <ProductCard2 key={index} product={product} />
              </Link>
            );
          })}

        {products !== undefined && products.length === 0 && (
          <div>Nothing found. Please change your filter!</div>
        )}
      </div>
    </div>
  );
}
