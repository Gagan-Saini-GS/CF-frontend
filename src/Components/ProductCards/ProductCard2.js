import React from "react";
import "./ProductCard2.css";
import { useState } from "react";

export default function ProductCard2(props) {
  const [product, setProduct] = useState(props.product);
  const [productID, setProductID] = useState("");
  function showProduct() {
    setProductID(props.product._id);
  }

  return (
    <div className="pc2-container" onClick={showProduct}>
      <div className="pc2-img-box">
        <img src={product.productImg} alt="" />
      </div>
      <div className="pc2-info-box">
        <div className="pc2-info-item pc2-name">{product.name}</div>
        <div className="pc2-info-item pc2-desc">{product.description}</div>
        <div className="pc2-info-item pc2-price">{product.price}/-</div>
        <div className="pc2-info-container">
          <div className="pc2-info-item  pc2-company">{product.company}</div>
          <div className="pc2-info-item pc2-category">{product.category}</div>
        </div>
      </div>
    </div>
  );
}
