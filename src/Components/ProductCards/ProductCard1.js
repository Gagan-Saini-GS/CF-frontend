import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProductCard1.css";

export default function ProductCard1(props) {
  const [product, setProduct] = useState(props.product);
  const [productID, setProductID] = useState("");
  function showProduct() {
    setProductID(props.product._id);
  }

  return (
    <div className="pc1-container" onClick={showProduct}>
      <div className="product-img-box">
        <img src={product.productImg[0]} alt="" />
      </div>
      <div className="product-info-box">
        <div className="product-info-item">{product.name}</div>
        <div className="product-info-item">{product.price}/-</div>
      </div>
    </div>
  );
}
