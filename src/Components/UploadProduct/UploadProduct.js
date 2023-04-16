import React, { useState } from "react";
import uploadImage from "../../Assets/imgChange";
import "./UploadProduct.css";
import axios from "axios";
import swal from "sweetalert";

export default function UploadProduct() {
  const [imgSrc, setImgSrc] = useState("images/not found.jpg");

  function uploadProduct() {
    const sizeArr = document.querySelectorAll(".size-box input");
    const sizes = [];
    for (let i = 0; i < sizeArr.length; i++) {
      if (sizeArr[i].checked) {
        sizes.push(sizeArr[i].value);
      }
    }

    const product = {
      name: document.querySelector(".name").value,
      price: document.querySelector(".price").value,
      company: document.querySelector(".company").value,
      category: document.querySelector(".category").value,
      description: document.querySelector(".description").value,
      productImg: imgSrc,
      sizes: sizes,
    };

    axios
      .post("http://localhost:5000/upload-product", {
        authToken: localStorage.getItem("authToken"),
        product: product,
      })
      .then((response) => {
        console.log(response.data);
        swal("Thanks", "Your Product is submitted!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops", "Something went wrong", "error");
      });
  }

  return (
    <div className="upload-product-container">
      <h1 className="upload-heading">Upload New Product</h1>
      <div className="upload-product-form">
        <div className="upf-box upload-product-img-container">
          <input
            type="file"
            multiple="multiple"
            onChange={(event) => {
              uploadImage(event).then((res) => {
                setImgSrc(res);
              });
            }}
          />
          <div className="preview-img-container">
            <img src={imgSrc} alt="" />
          </div>
        </div>
        <div className="upf-box">
          <div className="upload-product-form-item">
            <h3>Name</h3>
            <input
              type="text"
              className="name"
              placeholder="Name of the Product"
            />
          </div>
          <div className="upload-product-form-item">
            <h3>Price</h3>
            <input
              type="number"
              className="price"
              placeholder="Price of product"
            />
          </div>
          <div className="upload-product-form-item">
            <h3>Description</h3>
            <textarea
              className="description"
              rows="5"
              placeholder="Description of product"
            ></textarea>
          </div>
          <div className="upload-product-form-item">
            <h3>Company</h3>
            <select name="company" className="company">
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
              <option value="Gucci">Gucci</option>
              <option value="LouisVuitton">Louis Vuitton</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="upload-product-form-item">
            <h3>Category</h3>
            <select name="category" className="category">
              <option value="TShirts">T-Shirt</option>
              <option value="Shirts">Shirt</option>
              <option value="Shoes">Shoes</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="upload-product-form-item size-container">
            <h3>Available sizes</h3>
            <div className="size-chart-box sizes">
              <div className="size-box">
                <input type="checkbox" value="S" />
                <span>S</span>
              </div>
              <div className="size-box">
                <input type="checkbox" value="M" />
                <span>M</span>
              </div>
              <div className="size-box">
                <input type="checkbox" value="L" />
                <span>L</span>
              </div>
              <div className="size-box">
                <input type="checkbox" value="XL" />
                <span>XL</span>
              </div>
              <div className="size-box">
                <input type="checkbox" value="XXL" />
                <span>XXL</span>
              </div>
            </div>
          </div>
          <div className="upload-product-btn-container">
            <button onClick={uploadProduct}>Submit Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}
