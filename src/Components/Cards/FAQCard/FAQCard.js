import React from "react";
import "./FAQCard.css";

export default function FAQCard(props) {
  if (props.question.question === "" || props.question.question === null)
    return <></>;

  return (
    <div className="faq">
      <div className="faq-question">
        <span>Q.</span> {props.question.question}
      </div>
      <div className="faq-answer">
        <span>A.</span> {props.question.answer}
      </div>
      <div className="faq-author">{props.question.name}</div>
    </div>
  );
}
