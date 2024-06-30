export const sellerValidation = {
  email: (value) => {
    if (!value) {
      return "Email is required";
    }
    if (value.length < 3) {
      return "Email must be at least 3 characters long";
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

  panCardNumber: (value) => {
    if (!value) {
      return "PAN card number is required";
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(value)) {
      return "Invalid PAN card number format";
    }
  },

  gstNumber: (value) => {
    if (!value) {
      return "GST number is required";
    }
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!gstRegex.test(value)) {
      return "Invalid GST number format";
    }
  },

  terms: (value) => {
    if (!value) {
      return "Accept to continue";
    }
  },
};

export const sellerInitailValues = {
  email: "",
  phoneNumber: "",
  panCardNumber: "",
  gstNumber: "",
  terms: false,
};
