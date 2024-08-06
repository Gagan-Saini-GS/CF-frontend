import NotFoundImage from "../Assets/images/not found.jpg";

export const uploadProductValidation = {
  name: (value) => {
    if (!value) {
      return "Name is required";
    }
  },
  price: (value) => {
    if (!value) {
      return "Price is required";
    }
    if (isNaN(value)) {
      return "Price must be a number";
    }
    if (value <= 0) {
      return "Price must be greater than zero";
    }
    if (value > 1000000) {
      return "Price must be less than 1 million";
    }
  },
  brand: (value) => {
    if (!value) {
      return "Brand is required";
    }
  },
  gender: (value) => {
    if (!value) {
      return "Gender is required";
    }
  },
  category: (value) => {
    if (!value) {
      return "Category is required";
    }
  },
  materials: (value) => {
    if (!value) {
      return "Material is required";
    }
  },
  description: (value) => {
    if (!value) {
      return "Description is required";
    }
    if (value.length < 10) {
      return "Description must be at least 10 characters long";
    }
    if (value.length > 500) {
      return "Description must be less 500 characters";
    }
  },
  sizes: (value) => {
    if (!Array.isArray(value) || value.length === 0) {
      return "Size is required";
    }
  },
  colors: (value) => {
    if (!Array.isArray(value) || value.length === 0) {
      return "At least one color is required";
    }
  },
  productImages: (value) => {
    if (!Array.isArray(value) || value.length === 0) {
      return "At least one product image is required";
    }
    if (value.length === 1 && value.includes(NotFoundImage)) {
      return "At least one product image is required";
    }
  },
};

export const initailProductValues = {
  name: "",
  price: 0,
  brand: {
    name: "",
    value: "",
  },
  gender: "",
  category: {
    name: "",
    value: "",
  },
  materials: "",
  description: "",
  sizes: [],
  colors: [],
  productImages: [NotFoundImage],
};
