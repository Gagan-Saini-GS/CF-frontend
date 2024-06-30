import React from "react";
import "./ReviewCard.css";

export default function ReviewCard(props) {
  const count = props.review.starCount;
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i);
  }

  return (
    <div className="review">
      <div className="review-description">{props.review.reviewContent}</div>
      <div className="review-card-bottom">
        <div>
          {arr.map((star, index) => {
            return <span key={index}>&#9733;</span>;
          })}
        </div>
        <div className="review-author">{props.review.name}</div>
      </div>
    </div>
  );
}
