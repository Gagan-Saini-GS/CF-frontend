import React from "react";
import "./ReviewCard.css";

export default function ReviewCard(props) {
  return (
    <div className="review">
      <div className="review-description">{props.review.reviewContent}</div>
      <div className="review-author">{props.review.username}</div>
    </div>
  );
}
