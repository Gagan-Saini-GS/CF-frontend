import React from "react";
import "./FAQCard.css";

export default function FAQCard(props) {
  return (
    <div className="faq">
      <div className="faq-question">
        <span>Q.</span> {props.question.question}
      </div>
      <div className="faq-answer">
        <span>A.</span> {props.question.answer}
      </div>
      <div className="faq-author">{props.question.username}</div>
    </div>
  );
}
