import React, { useEffect, useState } from "react";
import "./Banner.css";

export default function Banner() {
  // Later this banners arr should be controlled by Admin
  // He will be able to add and remove banners as per his need.
  const banners = [
    "images/Banner 1.png",
    "images/Banner 2.png",
    "images/Banner 3.png",
  ];

  function changeBanner() {
    const banner = document.querySelector(".banner");
    let i = 0;
    setInterval(() => {
      i = (i + 1) % 3;
      banner.setAttribute("src", banners[i]);
    }, 5000);
  }
  changeBanner();

  return (
    <div className="banner-container">
      <div className="banner-box">
        <img className="banner" src={banners[0]} alt="Banner" />
      </div>
    </div>
  );
}
