import LinkedInImage from "./Assets/images/linkedin.png";
import GithubImage from "./Assets/images/github.png";

// export const SERVER_URL = "http://localhost:5000";
export const SERVER_URL = "https://cf-backend-ecru.vercel.app";

export const GUEST_USER_EMAIL = "guestuser@closetfashion.com";
export const GUEST_USER_PASSWORD = "guestuser";

export const Brands = [
  {
    id: 1,
    name: "Adidas",
  },
  {
    id: 2,
    name: "Nike",
  },
  {
    id: 3,
    name: "Puma",
  },
  {
    id: 4,
    name: "Gucci",
  },
  {
    id: 5,
    name: "Dior",
  },
  {
    id: 6,
    name: "Zara",
  },
  {
    id: 7,
    name: "H&B",
  },
  {
    id: 8,
    name: "Calvin Klein",
  },
  {
    id: 9,
    name: "Louis Vuitton",
  },
];

export const Colors = [
  {
    id: "white",
    name: "White",
    color: "white",
  },
  {
    id: "black",
    name: "Black",
    color: "black",
  },
  {
    id: "navy",
    name: "Navy",
    color: "navy",
  },
  {
    id: "skyBlue",
    name: "Sky Blue",
    color: "skyBlue",
  },
  {
    id: "green",
    name: "Green",
    color: "green",
  },
  {
    id: "red",
    name: "Red",
    color: "red",
  },
  {
    id: "mustard",
    name: "Mustard",
    color: "mustard",
  },
  {
    id: "coral",
    name: "Coral",
    color: "coral",
  },
  {
    id: "lavender",
    name: "Lavender",
    color: "lavender",
  },
  {
    id: "teal",
    name: "Teal",
    color: "teal",
  },
  {
    id: "olive",
    name: "Olive",
    color: "olive",
  },
  {
    id: "charcoal",
    name: "Charcoal",
    color: "charcoal",
  },
];

export const Sizes = [
  {
    id: 1,
    name: "S",
  },
  {
    id: 2,
    name: "M",
  },
  {
    id: 3,
    name: "L",
  },
  {
    id: 4,
    name: "XL",
  },
  {
    id: 5,
    name: "XXL",
  },
];

export const Discounts = [
  { id: 1, name: "10% Off" },
  { id: 2, name: "20% Off" },
  { id: 3, name: "30% Off" },
  { id: 4, name: "50% Off" },
];

export const Genders = [
  { id: 1, name: "Men" },
  { id: 2, name: "Women" },
  { id: 3, name: "Unisex" },
];

export const Materials = [
  { id: 1, name: "Cotton" },
  { id: 2, name: "Polyester" },
  { id: 3, name: "Leather" },
  { id: 4, name: "Denim" },
  { id: 5, name: "Wool" },
  { id: 6, name: "Silk" },
  { id: 7, name: "Linen" },
];

export const Ratings = [
  { id: 1, name: "1 Star & Up" },
  { id: 2, name: "2 Stars & Up" },
  { id: 3, name: "3 Stars & Up" },
  { id: 4, name: "4 Stars & Up" },
  { id: 5, name: "5 Stars" },
];

export const Categories = [
  { id: "1", name: "T-Shirt" },
  { id: "2", name: "Shirt" },
  { id: "3", name: "Sweatshirt" },
  { id: "4", name: "Jacket" },
  { id: "5", name: "Hoodie" },
  { id: "6", name: "Shoes" },
  { id: "7", name: "Trousers" },
  { id: "8", name: "Other" },
];

export const Quantity = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export const DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const PaymentMethods = [
  {
    id: "cod",
    name: "Cash On Delivery",
    value: "cod",
  },
  {
    id: "upi",
    name: "UPI",
    value: "upi",
  },
  {
    id: "credit-card",
    name: "Credit Card",
    value: "creditcard",
  },
  {
    id: "debit-card",
    name: "Debit Card",
    value: "debitcard",
  },
];

export const SocialMedia = [
  {
    id: "linkedin",
    name: "Linkedin",
    imgSrc: LinkedInImage,
    link: "https://www.linkedin.com/in/gagan-saini-gs/",
  },
  {
    id: "github",
    name: "Github",
    imgSrc: GithubImage,
    link: "https://github.com/Gagan-Saini-GS",
  },
];

// export const Categories = [
//   {
//     id: "1",
//     name: "Men",
//     subcategories: [
//       { id: "1-1", name: "T-Shirts" },
//       { id: "1-2", name: "Shirts" },
//       { id: "1-3", name: "Sweatshirts" },
//       { id: "1-4", name: "Jackets" },
//       { id: "1-5", name: "Activewear" },
//     ],
//   },
//   {
//     id: "2",
//     name: "Women",
//     subcategories: [
//       { id: "2-1", name: "Dresses" },
//       { id: "2-2", name: "Tops" },
//       { id: "2-3", name: "Skirts" },
//       { id: "2-4", name: "Pants" },
//       { id: "2-5", name: "Activewear" },
//     ],
//   },
//   {
//     id: "3",
//     name: "Unisex",
//     subcategories: [
//       { id: "3-1", name: "T-Shirts" },
//       { id: "3-2", name: "Shirts" },
//       { id: "3-3", name: "Pants" },
//       { id: "3-4", name: "Sweatshirts" },
//       { id: "3-5", name: "Activewear" },
//     ],
//   },
// ];

export const AllFilters = [
  {
    id: "brands",
    name: "Brands",
    options: Brands,
  },
  {
    id: "sizes",
    name: "Sizes",
    options: Sizes,
  },
  // {
  //   id: "discounts",
  //   name: "Discounts",
  //   options: Discounts,
  // },
  {
    id: "genders",
    name: "Genders",
    options: Genders,
  },
  // {
  //   id: "categories",
  //   name: "Categories",
  //   options: Categories,
  // },
  {
    id: "materials",
    name: "Materials",
    options: Materials,
  },
  //   {
  //     id: "ratings",
  //     name: "Ratings",
  //     options: Ratings,
  //   },
];

export const MIN_PRICE = 100;
export const MAX_PRICE = 100000;
