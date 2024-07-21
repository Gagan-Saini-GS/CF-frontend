export const buyProductPageUserValidations = {
  name: (value) => {
    if (!value) {
      return "Name is required";
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
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(value)) {
      return "Invalid phone number format";
    }
  },
  address: (value) => {
    console.log("Address", value);
    if (!value) {
      return "Address is required";
    }
  },
  upiIdValue: (value, formData) => {
    if (!value && !formData.cardNumber && formData.paymentMethod !== "cod") {
      return "UPI ID is required";
    }
    if (value) {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!upiRegex.test(value)) {
        return "Invalid UPI ID format";
      }
    }
  },
  cardNumber: (value, formData) => {
    if (!value && !formData.upiIdValue && formData.paymentMethod !== "cod") {
      return "Card Number is required";
    }
    if (value) {
      const cardNumberRegex = /^[0-9]{13,19}$/;
      if (!cardNumberRegex.test(value)) {
        return "Invalid card number format";
      }
    }
  },
  validDate: (value, formData) => {
    if (!value && !formData.upiIdValue && formData.paymentMethod !== "cod") {
      return "Card valid date is required";
    }
    if (value) {
      const validDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
      if (!validDateRegex.test(value)) {
        return "Invalid date format";
      }
    }
  },
  cvc: (value, formData) => {
    if (!value && !formData.upiIdValue && formData.paymentMethod !== "cod") {
      return "CVC is required";
    }
    if (value) {
      const cvcRegex = /^[0-9]{3,4}$/;
      if (!cvcRegex.test(value)) {
        return "Invalid CVC format";
      }
    }
  },
};

export const buyProductPageUserInitailValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  paymentMethod: "",
  upiIdValue: "",
  cardNumber: "",
  validDate: "",
  cvc: "",
};
