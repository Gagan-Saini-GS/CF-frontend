/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "320px",
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
    },
    extend: {
      colors: {
        White: "#F0F3F6",
        Light: "#DFE7F1",
        Gray: "#999999",
        Red: "#FF0000",
        Black: "#1E1E1E",
        Blue: "#0F4392",
        Purple: "#7B68EE",
        Green: "#48D198",
        Yellow: "#EFC863",
      },
    },
  },
  plugins: [],
};
