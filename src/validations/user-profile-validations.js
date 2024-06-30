export const profileValidations = {
  name: (value) => {
    if (!value) {
      return "Name is required";
    }
  },

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

  address: (value) => {
    if (!value) {
      return "Address is required";
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
};
