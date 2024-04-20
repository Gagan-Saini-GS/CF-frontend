import React, { useEffect, useState } from "react";
import uploadImage from "../../Assets/imgChange";
import "./UploadProduct.css";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

export default function UploadProduct() {
  const [imgSrc, setImgSrc] = useState(["images/not found.jpg"]);
  const [imgIndex, setImgIndex] = useState(0);
  const [isSeller, setSeller] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/user-details`, {
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        setSeller(response.data.foundUser.isSeller);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isSeller]);

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
      .post(`${SERVER_URL}/upload-product`, {
        authToken: localStorage.getItem("authToken"),
        product: product,
      })
      .then((response) => {
        swal("Thanks", "Your Product is submitted!", "success").then(() => {
          navigate("/home");
        });
      })
      .catch((err) => {
        console.log(err);
        swal("Oops", "Something went wrong", "error").then(() => {
          navigate("/home");
        });
      });
  }

  return (
    <div className="upload-product-container">
      {isSeller ? (
        <div>
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
                <img src={imgSrc[imgIndex]} alt="" />
                <div className="img-btn-container">
                  <button
                    onClick={() => {
                      if (imgIndex >= 1) {
                        setImgIndex(imgIndex - 1);
                      }
                    }}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => {
                      if (imgIndex < imgSrc.length - 1) {
                        setImgIndex(imgIndex + 1);
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="upload-product-form-item">
                <h3>Description</h3>
                <textarea
                  className="description"
                  rows="5"
                  placeholder="As always great desgin and quality..."
                ></textarea>
              </div>
            </div>
            <div className="upf-box">
              <div className="upload-product-form-item">
                <h3>Name</h3>
                <input
                  type="text"
                  className="name"
                  placeholder="CF 902-special"
                />
              </div>
              <div className="upload-product-form-item">
                <h3>Price</h3>
                <input type="number" className="price" placeholder="17999" />
              </div>
              {/* <div className="upload-product-form-item">
                <h3>Description</h3>
                <textarea
                  className="description"
                  rows="5"
                  placeholder="Description of product"
                ></textarea>
              </div> */}
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
              <div className="upload-product-form-item">
                <h3>Gender</h3>
                <select name="category" className="category">
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="kid">Kid</option>
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
      ) : (
        <div>
          <h1>To Sell Products you have to become seller</h1>
          <Link to={"/become-seller"}>
            <h2>Become Seller</h2>
          </Link>
        </div>
      )}
    </div>
  );
}
