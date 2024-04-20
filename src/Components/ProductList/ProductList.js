import React, { useEffect, useState } from "react";
import "./ProductList.css";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductCard2 from "../ProductCards/ProductCard2";
import checkNumber from "../../Assets/checkNumber";
import { SERVER_URL } from "../../config";

export default function ProductList() {
  const params = useParams();
  const filter = params.filter;
  const ans = checkNumber(filter);
  const [products, setProducts] = useState([]);
  let filterText = filter.toUpperCase();

  if (typeof ans === "number") {
    filterText = "Under " + ans;
  }

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/filtered-products`, {
        filter: filter,
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  return (
    <div>
      <div className="filter-text-parent">
        <h1 className="filter-text">Showing results for {filterText}</h1>
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
