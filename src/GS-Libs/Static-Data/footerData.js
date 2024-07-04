import LinkedInImage from "../../Assets/images/linkedin.png";
import TwitterImage from "../../Assets/images/twitter.png";
import YouTubeImage from "../../Assets/images/youtube.png";
import InstagramImage from "../../Assets/images/instagram.png";

export const FooterData = [
  {
    id: "shop-item",
    heading: "Shop",
    items: [
      { text: "Kids" },
      { text: "Mens" },
      { text: "Womens" },
      { text: "Unisex" },
    ],
  },
  {
    id: "about-item",
    heading: "About",
    items: [
      { text: "T & C" },
      { text: "About Us" },
      { text: "Contact Us" },
      { text: "Privacy Policy" },
    ],
  },
  {
    id: "help-item",
    heading: "Help",
    items: [
      { text: "Size Guide" },
      { text: "Coupon Code" },
      { text: "Customer Care" },
      { text: "Returns/Exchange" },
    ],
  },
  {
    id: "social-media-item",
    heading: "Follow Us",
    items: [
      { text: "Twitter", imgUrl: TwitterImage },
      { text: "LinkedIn", imgUrl: LinkedInImage },
      { text: "YouTube", imgUrl: YouTubeImage },
      { text: "Instagram", imgUrl: InstagramImage },
    ],
  },
];
