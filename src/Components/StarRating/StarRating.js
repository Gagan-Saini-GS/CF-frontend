import React, { useState } from "react";
import "./StarRating.css";

export default function StarRating(props) {
  const stars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(-1);
  const [hover, setHover] = useState(-1);

  return (
    <div className="star-rating">
      {stars.map((star, index) => {
        return (
          <div
            key={index}
            className={index <= (hover || rating) ? "on star" : "off star"}
            onClick={() => {
              setRating(index);
              props.setStarCount(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </div>
        );
      })}
    </div>
  );
}
