import React, { useState } from "react";
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
        <div
          className="product-info-item"
          style={{ fontSize: "1.25rem", fontWeight: 700 }}
        >
          {product.name}
        </div>
        {/* <div className="product-info-item">{product.price}/-</div> */}
        {/* <div className="action-container">
          <div
            className="pc-action-btn"
            style={{ backgroundColor: "#1e1e1e", color: "#f0f3f6" }}
          >
            Add To Cart
          </div>
          <div className="pc-action-btn" style={{ backgroundColor: "#48d198" }}>
            Buy Now
          </div>
        </div> */}
      </div>
    </div>
  );
}
