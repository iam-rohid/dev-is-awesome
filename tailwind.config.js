const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      gray: colors.zinc,
      accent: colors.blue,
      primary: colors.indigo,
      danger: colors.red,
      warning: colors.amber,
      success: colors.green,
      info: colors.sky,
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
