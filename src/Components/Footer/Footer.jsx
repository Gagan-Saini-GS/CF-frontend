import React from "react";
import { MdCopyright } from "react-icons/md";
import { SocialMedia } from "../../config";

const Footer = () => {
  const today = new Date().getFullYear();
  return (
    <div className="w-full px-4 py-2 bg-Black text-White/75 flex justify-between items-center relative">
      <div className="flex items-center gap-1">
        <div>All right reserved</div>
        <MdCopyright className="relative top-0.5" />
        <div>{today} - Closet Fashion</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hover:text-Purple font-medium text-lg">Gagan Saini</div>
        {SocialMedia.map((item) => {
          return (
            <div key={item.id} className="w-6 h-6">
              <a href={item.link} target="_blank">
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className="w-full h-full"
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
