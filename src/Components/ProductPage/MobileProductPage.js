import { SERVER_URL } from "../../config";
import React, { useEffect, useState } from "react";
import "./MobileProductPage.css";
import ReviewCard from "../Cards/ReviewCard/ReviewCard";
import FAQCard from "../Cards/FAQCard/FAQCard";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import swal from "sweetalert";
import { FaArrowRight, FaImage, FaPlus } from "react-icons/fa6";
import { Button } from "../../GS-Libs/MultiUse/button";

const MobileProductPage = ({ productID }) => {
  const [reviews, setReviews] = useState([]);
  const [faqs, setFAQs] = useState();
  const [product, setProduct] = useState({});
  const [writeReview, setWriteReview] = useState(false);
  const [askQuestion, setAskQuestion] = useState(false);
  const [stars, setStars] = useState(0);
  const allSizes = ["S", "M", "L", "XL", "XXL"];
  const [imgIndex, setImgIndex] = useState(0);

  const [isProductFetched, setIsProductFetched] = useState(false);

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/get-product-with-id`, {
        productID: productID,
      })
      .then((response) => {
        setProduct(response.data.foundProduct);
        setReviews(response.data.foundProduct?.reviews);
        setFAQs(response.data.foundProduct?.questions);
        // checkSize();

        setIsProductFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productID]);

  function submitReview() {
    // Fix this -> useState
    const reviewContent = document.querySelector(".review-form textarea").value;

    axios
      .post(`${SERVER_URL}/set-product-review`, {
        productID: productID,
        reviewContent: reviewContent,
        starCount: stars,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        // console.log(response.data);
        setReviews(response.data);
        swal("Thanks", "Your review added successfully", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Look's like something is wrong", "error");
      });

    setWriteReview(false);
  }

  function submitQuestion() {
    const question = document.querySelector(".faq-question").value;

    axios
      .post(`${SERVER_URL}/ask-product-question`, {
        productID: productID,
        question: question,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        swal(
          "Thanks",
          "Your question is added successfully you will get your answer soon",
          "success"
        );
        setFAQs(response.data);
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Look's like something is wrong", "error");
      });
    setAskQuestion(false);
  }

  function addToCart() {
    axios
      .post(`${SERVER_URL}/add-to-cart`, {
        productID: productID,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        swal("Congrats!", "Item added into your cart", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", err, "error");
      });

    // alert("Item added in your cart");
  }

  function buyNow() {
    // alert("Buy Now");
  }

  function setStarCount(index) {
    setStars(index + 1);
  }

  const decrease = () => {
    if (imgIndex >= 1) setImgIndex(imgIndex - 1);
    else setImgIndex(product.productImg.length - 1);
  };

  const increase = () => {
    if (imgIndex < product.productImg.length - 1) setImgIndex(imgIndex + 1);
    else setImgIndex(0);
  };

  return (
    <div className="mb-product-page-container">
      <div className="mb-product-detail-container">
        {isProductFetched ? (
          <>
            <div className="mb-product-img-container">
              {product?.productImg && (
                <div>
                  <img
                    className="mb-product-img"
                    src={product?.productImg[imgIndex]}
                    alt=""
                  />
                  {product?.productImg?.length > 1 && (
                    <div className="mb-product-img-btn-container">
                      <Button
                        ButtonText="Prev"
                        onClick={decrease}
                        className="mb-img-btn-container"
                      />
                      <Button
                        ButtonText="Next"
                        onClick={increase}
                        className="mb-img-btn-container"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="mb-product-img-container">
            <div className="mb-product-img-placeholder">
              <FaImage style={{ height: "100%", width: "100%" }} />
            </div>
          </div>
        )}
        <div className="mb-product-info-container">
          <div className="mb-product-name">{product?.name}</div>
          <div className="mb-product-description-container">
            <div className="mb-product-description">
              <div>{product?.description}</div>
            </div>
            <div className="mb-product-details">
              <h2>Details</h2>
              <div className="mb-product-scale-container">
                <div className="mb-product-scale-item">
                  <p>Fit</p>
                  <p className="mb-product-scale">
                    &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;
                  </p>
                </div>
                <div className="mb-product-scale-item">
                  <p>Durablity</p>
                  <p className="mb-product-scale">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </p>
                </div>
                <div className="mb-product-scale-item">
                  <p>Comfort</p>
                  <p className="mb-product-scale">
                    &#9733;&#9733;&#9733;&#9733;&#9733;&#9733;&#9733;
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-product-price">₹ {product?.price}/-</div>
        </div>

        <div className="mb-product-side-container">
          <div className="mb-product-size-container">
            <h3 className="mb-size-heading">Sizes</h3>
            <ul>
              {allSizes.map((size) => (
                <li
                  key={size}
                  className={
                    product?.sizes?.includes(size) ? "mb-available-size" : ""
                  }
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-btn-container">
            <button
              className="mb-product-btn mb-add-to-cart-btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button className="mb-product-btn mb-buy-now-btn" onClick={buyNow}>
              <Link to={"/product/buynow/" + productID}>Buy Now</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-product-review-container">
        <div className="mb-product-review-heading">
          <h2>Customer Reviews</h2>
          <h2
            className="mb-write-or-ask-plus"
            onClick={() => {
              setWriteReview(true);
            }}
          >
            <FaPlus />
          </h2>
        </div>
        <div className="mb-reviews-container">
          {writeReview && (
            <div className="mb-write-review-container">
              <h3>Share Your Experience</h3>
              <div className="mb-review-form">
                <textarea placeholder="Write a review"></textarea>
                <div className="mb-review-rating-form">
                  <StarRating setStarCount={setStarCount} />
                  <button onClick={submitReview}>Submit</button>
                </div>
              </div>
            </div>
          )}
          {reviews !== undefined &&
            reviews.map((review, index) => {
              return <ReviewCard key={index} review={review} />;
            })}
        </div>
      </div>
      <div className="mb-product-review-container">
        <div className="mb-product-review-heading">
          <h2>FAQ's</h2>
          <h2
            className="mb-write-or-ask-plus"
            onClick={() => {
              setAskQuestion(true);
            }}
          >
            <FaPlus />
          </h2>
        </div>
        <div className="mb-reviews-container">
          {askQuestion && (
            <div className="mb-write-review-container">
              <h3>Ask Your Question</h3>
              <div className="mb-faq-form">
                <textarea
                  placeholder="Question"
                  className="mb-faq-question"
                ></textarea>
                <div className="mb-review-rating-form">
                  <button onClick={submitQuestion}>Ask</button>
                </div>
              </div>
            </div>
          )}

          {faqs !== undefined &&
            faqs.map((question, index) => {
              return <FAQCard key={index} question={question} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MobileProductPage;
