export const profileValidations = {
  name: (value) => {
    if (!value) {
      return "User name is required";
    }
  },
  email: (value) => {
    if (!value) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email format";
    }
  },
  phoneNumber: (value) => {
    if (!value) {
      return "Phone number is required";
    }
    if (value.length !== 10) {
      return "Phone number must be 10 digits long";
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      return "Invalid phone number format";
    }
  },
  address: (value) => {
    if (!value) {
      return "Address is required";
    }
  },
  website: (value) => {
    if (!value) {
      return "Website URL is required";
    }
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(value)) {
      return "Invalid URL format";
    }
  },
};

export const profileInitailValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  profileImage: "images/man.png",
  website: "",
  // cart: [],
  orders: [],
  isSeller: false,
};
