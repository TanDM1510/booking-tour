const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        light: "linear-gradient(135deg, #6A9ED7 0%, #0150A6 88.5%)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
