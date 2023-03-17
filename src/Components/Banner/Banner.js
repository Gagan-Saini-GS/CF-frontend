import React, { useEffect, useState } from "react";
import "./Banner.css";

export default function Banner() {
  const banners = [
    "images/Banner 1.png",
    "images/Banner 2.png",
    "images/Banner 3.png",
  ];

  const [bannerIndex, setBannerIndex] = useState(0);

  //   useEffect(() => {
  //     setInterval(() => {
  //       setBannerIndex((bannerIndex + 1) % 3);
  //     }, 2500);
  //   }, [bannerIndex]);

  return (
    <div className="banner-container">
      <div className="banner-box">
        <img className="banner" src={banners[2]} alt="" />
      </div>
    </div>
  );
}
