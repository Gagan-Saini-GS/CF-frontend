import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import ProductCard1 from "../ProductCards/ProductCard1";
import axios from "axios";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../config";

export default function Home({ setUser }) {
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

  return (
    <div className="home-container">
      <div>
        <Navbar setUser={setUser} />
        <Banner />

        <div className="recently-viewed-container">
          <h2>Recently viewed products</h2>
          <div className="recent-box">
            {allProducts.slice(0, 5).map((product, index) => {
              return (
                <Link
                  className="product-card-link"
                  key={index}
                  to={"/product/" + product._id}
                >
                  <ProductCard1 product={product} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="top-trends-container">
          <h2>Top Trends</h2>
          <div className="top-trend-box">
            {allProducts.reverse().map((product, index) => {
              return (
                <Link
                  className="product-card-link"
                  key={index}
                  to={"/product/" + product._id}
                >
                  <ProductCard1 product={product} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="top-trends-container">
          <h2>All Products</h2>
          <div className="top-trend-box">
            {allProducts.map((product, index) => {
              return (
                <Link
                  className="product-card-link"
                  key={index}
                  to={"/product/" + product._id}
                >
                  <ProductCard1 product={product} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
