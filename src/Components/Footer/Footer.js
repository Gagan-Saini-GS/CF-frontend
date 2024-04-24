import React from "react";
import "./Footer.css";
import { BackgroundEffectText } from "../../GS-Libs";
import { FooterData } from "../../GS-Libs/Static-Data/footerData";

const FooterItem = ({ heading, items }) => {
  return (
    <div className="footer-item">
      <h2 className="footer-item-heading">{heading}</h2>
      <div className="footer-item-details">
        {items.map((item) => {
          return (
            <BackgroundEffectText
              key={item.text}
              text={item.text}
              imgUrl={item.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <div className="footer-container">
      {FooterData.map((footerItem) => {
        return (
          <FooterItem
            key={footerItem.id}
            heading={footerItem.heading}
            items={footerItem.items}
          />
        );
      })}
    </div>
  );
}
