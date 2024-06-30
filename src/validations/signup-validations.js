export const signupValidations = {
  name: (value) => {
    if (!value) {
      return "Username is required";
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
  password: (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
  },
};

export const signupInitailValues = {
  name: "",
  email: "",
  password: "",
};
