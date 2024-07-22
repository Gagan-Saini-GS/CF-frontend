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
    if (value !== "" && value.length !== 10) {
      return "Phone number must be 10 digits long";
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (value !== "" && !phoneRegex.test(value)) {
      return "Invalid phone number format";
    }
  },
  website: (value) => {
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (value !== "" && !urlRegex.test(value)) {
      return "Invalid URL format";
    }
  },
};

export const profileInitailValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  profileImage: "",
  website: "",
  // cart: [],
  orders: [],
  isSeller: false,
};
