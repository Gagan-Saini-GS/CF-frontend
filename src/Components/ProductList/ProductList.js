import React, { useEffect, useState } from "react";
import "./ProductList.css";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ProductCard2 from "../ProductCards/ProductCard2";

export default function ProductList() {
  const params = useParams();
  const filter = params.filter;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/filtered-products", {
        filter: filter,
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
  );
}
