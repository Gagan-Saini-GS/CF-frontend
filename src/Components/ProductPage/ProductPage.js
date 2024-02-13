import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import ReviewCard from "../Cards/ReviewCard/ReviewCard";
import FAQCard from "../Cards/FAQCard/FAQCard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import swal from "sweetalert";

export default function ProductPage() {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
  const [faqs, setFAQs] = useState();
  const [product, setProduct] = useState({});
  const [writeReview, setWriteReview] = useState(false);
  const [askQuestion, setAskQuestion] = useState(false);
  const [stars, setStars] = useState(0);
  let availableSizes = new Map([]);
  const productID = params.productID;
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    axios
      .post("https://cf-backend-1cic.onrender.com/get-product-with-id", {
        authToken: localStorage.getItem("authToken"),
        productID: productID,
      })
      .then((response) => {
        setProduct(response.data.foundProduct);
        setReviews(response.data.foundProduct.reviews);
        setFAQs(response.data.foundProduct.questions);
        // checkSize();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productID]);

  function checkSize() {
    if (product.sizes !== undefined) {
      for (let i = 0; i < product.sizes.length; i++) {
        availableSizes.set(product.sizes[i], true);
      }
    }
  }

  function submitReview() {
    const reviewContent = document.querySelector(".review-form textarea").value;

    axios
      .post("https://cf-backend-1cic.onrender.com/set-product-review", {
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
    const answer = document.querySelector(".faq-answer").value;
    // console.log(reivewContent);

    axios
      .post("https://cf-backend-1cic.onrender.com/ask-product-question", {
        productID: productID,
        question: question,
        answer: answer,
        authToken: localStorage.getItem("authToken"),
      })
      .then((response) => {
        // console.log(response.data);
        swal(
          "Thanks",
          "Your question is added successfully you get your soon",
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
      .post("https://cf-backend-1cic.onrender.com/add-to-cart", {
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

  return (
    <div className="product-page-container">
      <div className="product-detail-container">
        <div className="product-info-container">
          <div className="product-name">{product.name}</div>
          <div className="product-price">{product.price}/-</div>
        </div>
        <div className="product-img-container">
          {product.productImg !== undefined && (
            <div>
              <img
                className="product-img"
                src={product.productImg[imgIndex]}
                alt=""
              />
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
                    if (imgIndex < product.productImg.length - 1) {
                      setImgIndex(imgIndex + 1);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="product-side-container">
          <div className="product-size-container">
            <h3 className="size-heading">Select Size</h3>
            <ul>
              {checkSize()}
              <li className={availableSizes.has("S") ? "available-size" : ""}>
                S
              </li>
              <li className={availableSizes.has("M") ? "available-size" : ""}>
                M
              </li>
              <li className={availableSizes.has("L") ? "available-size" : ""}>
                L
              </li>
              <li className={availableSizes.has("XL") ? "available-size" : ""}>
                XL
              </li>
              <li className={availableSizes.has("XXL") ? "available-size" : ""}>
                XXL
              </li>
            </ul>
          </div>
          <div className="btn-container">
            <button className="product-btn" onClick={addToCart}>
              add to cart <span>&rarr;</span>
            </button>
            <button className="product-btn" onClick={buyNow}>
              <Link to={"/product/buynow/" + productID}>
                buy now <span>&rarr;</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="product-description-container">
        <div className="product-description">
          <h2>Description</h2>
          <div>{product.description}</div>
        </div>
        <div className="product-details">
          <h2>Details</h2>
          <div className="product-scale-container">
            <div className="product-scale-item">
              <p>Fit</p>
              <p className="product-scale">⭐⭐⭐⭐⭐⭐</p>
            </div>
            <div className="product-scale-item">
              <p>Durablity</p>
              <p className="product-scale">⭐⭐⭐⭐⭐</p>
            </div>
            <div className="product-scale-item">
              <p>Comfort</p>
              <p className="product-scale">⭐⭐⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
      </div>
      <div className="product-review-container">
        <div className="product-review-heading">
          <h2>Customer Reviews</h2>
          <h2
            className="write-or-ask"
            onClick={() => {
              setWriteReview(true);
            }}
          >
            Write A Review
          </h2>
          <h2
            className="write-or-ask-plus"
            onClick={() => {
              setWriteReview(true);
            }}
          >
            <span>+</span>
          </h2>
        </div>
        <div className="reviews-container">
          {writeReview && (
            <div className="write-review-container">
              <h3>Share Your Experience</h3>
              <div className="review-form">
                <textarea placeholder="Write a review"></textarea>
                <StarRating setStarCount={setStarCount} />
                <button onClick={submitReview}>Submit</button>
              </div>
            </div>
          )}
          {reviews !== undefined &&
            reviews.map((review, index) => {
              return <ReviewCard key={index} review={review} />;
            })}
        </div>
      </div>
      <div className="product-review-container">
        <div className="product-review-heading">
          <h2>FAQ's</h2>
          <h2
            className="write-or-ask"
            onClick={() => {
              setAskQuestion(true);
            }}
          >
            Ask A Question
          </h2>
          <h2
            className="write-or-ask-plus"
            onClick={() => {
              setAskQuestion(true);
            }}
          >
            <span>+</span>
          </h2>
        </div>
        <div className="reviews-container">
          {askQuestion && (
            <div className="write-review-container">
              <h3>Ask Your Question</h3>
              <div className="faq-form">
                <textarea
                  placeholder="Question"
                  className="faq-question"
                ></textarea>
                <textarea
                  placeholder="Answer"
                  className="faq-answer"
                ></textarea>
                <button onClick={submitQuestion}>Submit</button>
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
}
